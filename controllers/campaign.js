/**
* Campaign Controller
*/

// Load required packages
var Campaign = require('../models/campaign');
var Guild = require('../models/guild');
var shortid = require('shortid');

/**
* Creates a new campaign. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postCampaigns = function(req, res) {
    
    var campaign = new Campaign();
    campaign.name = req.body.name;
    campaign.created_by = req.decoded._id;
    campaign.description = req.body.description;
    campaign.players = [req.decoded._id];
    // campaign.guilds = req.body.guilds;
    campaign.expansion = req.body.expansion;
    campaign.log = req.body.log;
    campaign.code = shortid.generate();
    
    
    if(req.body.players){
        var friends = req.body.players.filter( function( friend, index, ret ) {
            if (friend)
                return ret.indexOf(friend) == index
        })
        campaign.players = campaign.players.concat(friends)
    }
    
    campaign.save(function (err, campaign) {
        if (err) res.status(500).send(err);
        res.json({success: true, message: 'Guild Created', campaign: campaign});
    });
    
};

/**
* Returns all campaigns the user either created or is a member of.
*/
exports.getCampaigns = function(req, res) {
    Campaign.find({$or: [{created_by: req.decoded._id}, {players: req.decoded._id}]}, function(err, campaigns) {
        if (err)
            res.status(500).send(err);
        res.json({ success: true, campaigns: campaigns });
    }).sort('-createdAt');
};


/**
* Gets the full populated campaign info for the requested campaign.
*/
exports.getCampaign = function(req, res) {
    Campaign.findById(req.params.campaign_id, function(err, campaign) {
        if (err) res.send(err);
        res.status(200).json({ success: true, campaigns: campaign });
    })
    .populate('players', '_id name')
    .populate({
        path: 'guilds',
        model: 'Guild',
        populate: [{
            path: 'user_id',
            model: 'User',
            select: '_id name'
        },{
            path: 'heroes.hero_id',
            model: 'Hero'
        },{
            path: 'heroes.items',
            model: 'Item'
        },{
            path: 'heroes.curses',
            model: 'Curse'
        },{
            path: 'pets.pet_id',
            model: 'Pet'
        },{
            path: 'pets.items',
            model: 'Item'
        }
        
        ]
    })
};


/**
* Update an existing Campaign.  This method assumes that the json supplied in the 
* request is properly formatted.
*/
exports.putCampaign = function(req, res) {
    Campaign.findById(req.params.campaign_id, function(err, campaign) {
        if (err)
            res.send(err);
            
        // make sure the user owns the campaign
        // if(campaign.user_id != req.decoded._id)
        //     return res.send({ success: false, message: 'You do not have permission to update this campaign' });    
        
        // we are assuming that the data provided is valid and formatted properly
        // campaign.name = req.body.name || campaign.name;      // can't change campaign name? 
        campaign.description = req.body.description || campaign.description;
        campaign.guilds = req.body.guilds || campaign.guilds;
        campaign.players = req.body.players || campaign.players;
        campaign.expansion = req.body.expansion || campaign.expansion;
        campaign.log = req.body.log || campaign.log;
        
        campaign.save(function (err, campaign) {
            if (err) res.status(500).send(err);
            
            if(req.body.kick)
                Guild.findByIdAndUpdate({_id: req.body.kick}, {$unset: {campaign: ""}},function(err, guild){
                    if (err) res.status(500).send(err);
                })
            
            var opts = [
                { path: 'players', select: '_id name' },
                { path: 'guilds', 
                    populate: [{
                        path: 'user_id',
                        model: 'User',
                        select: '_id name'
                    },{
                        path: 'heroes.hero_id',
                        model: 'Hero'
                    },{
                        path: 'heroes.items',
                        model: 'Item'
                    },{
                        path: 'heroes.curses',
                        model: 'Curse'
                    },{
                        path: 'pets.pet_id',
                        model: 'Pet'
                    },{
                        path: 'pets.items',
                        model: 'Item'
                    }
                    
                    ] }
            ]
            
            // I dont think I should be doing this here like this but it seems to work OK  ¯\_(ツ)_/¯
            Campaign.populate(campaign, opts, function (err, guild) {
                if (err) res.status(500).send(err);
                res.send({ success: true, message: 'Campaign updated successfully', campaign: campaign });    
            })
            
        });
        
    })
};


/**
* Removes the Campaign matching the supplied id.
*/
exports.deleteCampaign = function(req, res) {
    Campaign.remove({_id: req.params.campaign_id, created_by: req.decoded._id}, function(err, campaign) {
        if (err) res.send(err);
        //update all guilds that are assigned to this campaign
        Guild.update(
            {campaign: req.params.campaign_id}, 
            {$unset: {campaign: ""}},
            {multi: true },
            function(err, guild){
                if (err) res.status(500).send(err);
            }
        )
                
        res.send({ success: true, message: 'Campaign removed successfully' });    
    });
};

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
    campaign.players = [{player: req.decoded._id},null,null,null];
    campaign.expansion = req.body.expansion;
    campaign.log = req.body.log;
    campaign.code = shortid.generate();
    
    if(req.body.players){
        for (var i = 0; i < req.body.players.length; i++ ) {
            campaign.players[i+1] = { player: req.body.players[i] }
        }
    }
    
    campaign.save(function (err, campaign) {
        if (err) res.status(500).send(err);
        res.json({success: true, message: 'Campaign Created', campaign: campaign});
    });
    
};

/**
* Returns all campaigns the user either created or is a member of.
*/
exports.getCampaigns = function(req, res) {
    Campaign.find({$or: [{created_by: req.decoded._id}, {'players.player': req.decoded._id}]}, function(err, campaigns) {
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
        if (err) 
            res.send(err);
            
        if( !playerCanView(req.decoded._id, campaign) ){
            return res.send({ success: false, message: 'You do not have permission to access this campaign' });    
        }
        
        res.status(200).json({ success: true, campaigns: campaign });
    })
    .populate({
        path: 'players.player',
        model: 'User',
        select: '_id name'
    })
    .populate({
        path: 'players.guild',
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
            
        // if we are updating the players prop make sure the user has access
        if( req.body.players && !playerCanAddGuild(req.decoded._id, campaign) ){
            return res.send({ success: false, message: 'You do not have permission to update this campaign' });    
        }
        
        
        // we are assuming that the data provided is valid and formatted properly
        // campaign.name = req.body.name || campaign.name;      // can't change campaign name? 
        campaign.description = req.body.description || campaign.description;
        campaign.guilds = req.body.guilds || campaign.guilds;
        campaign.expansion = req.body.expansion || campaign.expansion;
        campaign.log = req.body.log || campaign.log;

        // we have to handle players differently because assigning the array 
        // from the client does not work as expected
        if(req.body.players)
            req.body.players.forEach((player, index) => {
              campaign.players[index]  = player
            })
        else 
            campaign.players = campaign.players

        if(req.body.kick){
            Guild.findByIdAndUpdate({_id: req.body.kick}, {$unset: {campaign: "", code: ""}},function(err, guild){
                if (err) res.status(500).send(err)
            })
            
            // remove all instances of the kickee from the log
            const newLog = campaign.log.map((obj, index)=>{
                if(obj.winner === req.body.playerID) obj.winner = null
                if(obj.deaths === req.body.playerID) obj.deaths = null
                if(obj.coins === req.body.playerID) obj.coins = null
                if(obj.reward === req.body.playerID) obj.reward = null
                if(obj.title === req.body.playerID) obj.title = null
                return obj
            })

            campaign.log = newLog
            campaign.markModified('log');   // have to let mongoose know the field has changed
            
        }
        
        campaign.save(function (err, campaign) {
            if (err) res.status(500).send(err);
            
                        
            if(req.body.addingGuild){
                Guild.findByIdAndUpdate({_id: req.body.guildID}, {$set: {campaign: campaign._id}},function(err, guild){
                    if (err) res.status(500).send(err)
                })
            }
            
            var opts = [
                { path: 'players.player', model: 'User', select: '_id name' },
                { path: 'players.guild', 
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


function playerCanModify(id, campaign){
    if(campaign.created_by == id)
        return true
    return false
}

function playerCanView(id, campaign){
    var ret = false
    campaign.players.forEach(function(player){
        if( player && (player.player == id || player.player._id == id) )
            ret = true
    })
    return ret
}

function playerCanAddGuild(id, campaign){
    return playerCanView(id, campaign)
}
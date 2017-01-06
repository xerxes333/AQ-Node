/**
* Campaign Controller
*/

// Load required packages
var Campaign = require('../models/campaign');

/**
* Creates a new campaign. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postCampaigns = function(req, res) {
    
    var campaign = new Campaign();
    campaign.name = req.body.name;
    campaign.created_by = req.decoded._doc;
    campaign.description = req.body.description;
    campaign.players = [req.decoded._doc];
    campaign.guilds = req.body.guilds;
    
    campaign.save(function (err, campaign) {
        if (err)
            res.status(500).send(err);
        
        res.json({success: true, message: 'Guild Created'});
    });
    
};

/**
* Returns all campaigns the user either created or is a member of.
*/
exports.getCampaigns = function(req, res) {
    Campaign.find({$or: [{user_id: req.decoded._doc._id}, {players: req.decoded._doc._id}]}, function(err, campaigns) {
        if (err)
            res.status(500).send(err);
        res.json(campaigns);
    });
};


/**
* Gets the full populated campaign info for the requested campaign.
*/
exports.getCampaign = function(req, res) {
    Campaign.findById(req.params.campaign_id, function(err, campaign) {
        if (err) res.send(err);
        res.json(campaign);
    })
    .populate('players', '_id, name')
    .populate({
        path: 'guilds',
        model: 'Guild',
        populate: [{
            path: 'user_id',
            model: 'User',
            select: '_id, name'
        },{
            path: 'heroes.hero_id',
            model: 'Hero'
        },
        {
            path: 'heroes.items',
            model: 'Item'
        }]
    });
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
        // if(campaign.user_id != req.decoded._doc._id)
        //     return res.send({ success: false, message: 'You do not have permission to update this campaign' });    
        
        // we are assuming that the data provided is valid and formatted properly
        // campaign.name = req.body.name || campaign.name;      // can't change campaign name? 
        campaign.description = req.body.description || campaign.description;
        campaign.guilds = req.body.guilds || campaign.guilds;
        campaign.players = req.body.players || campaign.players;
        
        campaign.save(function (err, campaign) {
            if (err) res.status(500).send(err);
            res.send({ success: true, message: 'Guild updated successfully' });    
        });
        
    });
};


/**
* Removes the Campaign matching the supplied id.
*/
exports.deleteCampaign = function(req, res) {
    Campaign.remove({_id: req.params.campaign_id, user_id: req.decoded._doc._id}, function(err, campaign) {
        if (err) res.send(err);
        res.send({ success: true, message: 'Campaign removed successfully' });    
    });
};
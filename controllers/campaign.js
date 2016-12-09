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
        
        res.json({success: true, message: 'Guild Created', campaign: campaign});
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
        if (err)
            res.send(err);
        res.json(campaign);
    })
    .populate('players', '_id, name')
    .populate('guilds');
};


/**
* Update an existing Campaign.  This method assumes that the json supplied in the 
* request is properly formatted.
*/
exports.putCampaign = function(req, res) {
    res.json({success: true, message: 'putCampaign'});
};


/**
* Removes the Campaign matching the supplied id.
*/
exports.deleteCampaign = function(req, res) {
    res.json({success: true, message: 'deleteCampaign'});
};
/**
* Guild Controller
*/

// Load required packages
var Guild = require('../models/guild');

/**
* Creates a new guild. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postGuilds = function(req, res) {
    var guild = new Guild();
    guild.name = req.body.name;
    guild.user_id = req.decoded._doc;
    guild.description = req.body.description;
    guild.heroes = req.body.heroes;
    
    guild.save(function (err, guild) {
        if (err)
            res.status(500).send(err);
        
        res.json({success: true, message: 'Guild Created', guild: guild});
    });
};

/**
* Returns all guilds for the specific user.
*/
exports.getGuilds = function(req, res) {
    // Use the Guild model to find all guilds
    Guild.find({user_id: req.decoded._doc._id}, function(err, guilds) {
        if (err)
            res.send(err);
        res.json(guilds);
    });
};


/**
* Gets the full populated guild info for the requested guild.
*/
exports.getGuild = function(req, res) {
    Guild.findById(req.params.guild_id, function(err, guild) {
        if (err)
            res.send(err);
        res.json(guild);
    })
    .populate('user_id', '_id, name')
    .populate('heroes.hero_id')
    .populate('heroes.items');
};


/**
* Update an existing guild.  This method assumes that the json supplied in the 
* request is properly formatted.
*/
exports.putGuild = function(req, res) {
    Guild.findById(req.params.guild_id, function(err, guild) {
        if (err)
            res.send(err);
            
        // make sure the user owns the guild
        if(guild.user_id != req.decoded._doc._id)
            res.send({ success: false, message: 'You do not have permission to update this guild' });    
        
        // we are assuming that the data provided is valid and formatted properly
        guild.name = req.body.name || guild.name;
        guild.description = req.body.description || guild.description;
        guild.heroes = req.body.heroes || guild.heroes;
        
        guild.save(function (err, guild) {
            if (err)
                res.status(500).send(err);
            res.send({ success: true, message: 'Guild updated successfully' });    
        });
        
    });
};


/**
* Removes the guild matching the supplied id.
*/
exports.deleteGuild = function(req, res) {
    Guild.remove({_id: req.params.guild_id, user_id: req.decoded._doc._id}, function(err, guilds) {
        if (err)
            res.send(err);
        res.send({ success: true, message: 'Guild removed successfully' });    
    });
};
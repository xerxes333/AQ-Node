/**
* Guild Controller
*/

// Load required packages
var Guild = require('../models/guild');
var Campaign = require('../models/campaign');

/**
* Creates a new guild. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postGuilds = function(req, res) {
    var guild = new Guild();
    guild.name = req.body.name;
    guild.user_id = req.decoded._id;
    guild.description = req.body.description;
    guild.type = req.body.type;
    guild.heroes = req.body.heroes;
    guild.pets = req.body.pets;
    
    
    // look for and assign the campaign ID to a guild if a code was included 
    Campaign.find({code: req.body.code || ""},function(err,campaigns){
      
      if (err) return res.send(err);
      
      // There can be only One! (with a matching code)
      if(campaigns.length === 1){
        // add the guid._id to the campaign.guilds[]
        campaigns[0].guilds.push(guild._id)
        // save the campaign and if everything goes OK add the campaign._id to guild.campaign
        campaigns[0].save((err, campaign)=>{
          if(!err) guild.campaign = campaign._id
        })
      }
        
      // we still save the guild even if something went wonky with the campaign part
      guild.save(function (err, guild) {
        if (err) res.status(500).send(err);
        res.json({
          success: true, 
          message: 'Guild Created', 
          guild: guild.populate('user_id', '_id, name')
            .populate('heroes.hero_id')
            .populate('heroes.items')
            .populate('heroes.curses')
            .populate('pets.pet_id')
            .populate('pets.items')
        });
      });
      
    })

};

/**
* Returns all guilds for the specific user.
*/
exports.getGuilds = function(req, res) {
    
    var criteria = {user_id: req.decoded._id};

    // getting available guilds for campaign
    // obviously this is not the right way to do this but I need to get past this sticking point
    if(req.query && req.query.available){
      var ex = (req.query.available == 1 || req.query.available == 'true')? false : true;
      Object.assign(criteria, {campaign: {$exists: ex}});
    }
    
    Guild.find(criteria, function(err, guilds) {
        if (err)
            res.send(err);
        res.json({ success: true, guilds: guilds });
    }).sort('-createdAt');
};


/**
* Gets the full populated guild info for the requested guild.
*/
exports.getGuild = function(req, res) {
    
  Guild.findById(req.params.guild_id, function(err, guild) {
    if (err)
      res.send(err);
    res.json({ success: true, guild: guild });
  })
  .populate('user_id', '_id name')
  .populate('campaign', '_id name created_by players guilds')
  .populate('heroes.hero_id')
  .populate('heroes.items')
  .populate('heroes.curses')
  .populate('pets.pet_id')
  .populate('pets.items')
};


/**
* Update an existing guild.  This method assumes that the json supplied in the 
* request is properly formatted.
*/
exports.putGuild = function(req, res) {
  Guild.findById(req.params.guild_id, function(err, guild) {
    if (err) res.send(err);
    
    // make sure the user owns the guild
    if(guild.user_id != req.decoded._id)
      res.send({ success: false, message: 'You do not have permission to update this guild' });    
    
    // we are assuming that the data provided is valid and formatted properly
    guild.name = req.body.name || guild.name;
    guild.description = req.body.description || guild.description;
    guild.heroes = req.body.heroes || guild.heroes;
    guild.pets = req.body.pets || guild.pets;
    guild.type = req.body.type || guild.type;
    guild.coin = req.body.coin || guild.coin;
    
    // If we are removing our campaignguild from the guild unset the campaign
    guild.campaign = (req.body.campaign === 'LEAVE')? undefined : req.body.campaign || guild.campaign
    
    // We are assigning the guild to a campaign based on a share code
    // The model handles linking the campaign and guild to one another during the pre-save
    guild.code = req.body.code || undefined
    
    guild.save(function (err, guild) {
      if (err) res.status(500).send(err);
      
      var opts = [
        { path: 'user_id', select: '_id name' },
        { path: 'campaign', select: '_id name created_by players guilds' },
        { path: 'heroes.hero_id'},
        { path: 'heroes.items'},
        { path: 'heroes.curses'},
        { path: 'pets.pet_id'},
        { path: 'pets.items'},
      ]
      
      // I dont think I should be doing this here like this but it seems to work OK  ¯\_(ツ)_/¯
      Guild.populate(guild, opts, function (err, guild) {
        if (err) res.status(500).send(err);
        
        res.send({
          success: true, 
          message: 'Guild updated successfully', 
          guild: guild
        });
      })

      
    })
      
  })
};


/**
* Removes the guild matching the supplied id.
*/
exports.deleteGuild = function(req, res) {
  
  // get our guild 
  Guild.findById({_id: req.params.guild_id, user_id: req.decoded._id}, function(err, guild) {
    
    if (err) res.send(err);
    
    // make sure the user is allowed to change the guild
    if(guild.user_id != req.decoded._id)
        res.send({ success: false, message: 'You do not have permission to update this guild' });    
    
    // remove guild from any campaign that contains it(should only be one) 
    Campaign.update(
      {guilds: guild._id},
      {$pullAll: {guilds: [guild._id] } },
      function(err, campaign){
        if (err) res.send(err);
      }
    )
    
    guild.remove(function(err, guild) {
      if (err) res.send(err);
      res.send({ success: true, message: 'Guild removed successfully' });
    })
    
  });
};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GUILD_LIMIT = 4;

var CampaignSchema   = new Schema({
    name: { type: String, required: true },
    created_by: { type : Schema.ObjectId, ref: 'User', required: true },
    description: String,
    code: { type: String, unique: true},
    expansion: { type: String, default: "Core"},
    players: {
        type: [{
          _id: false,
          player: {type: Schema.ObjectId, ref: 'User'},
          guild: {type: Schema.ObjectId, ref: 'Guild'}
        }],
        // unique: true,
        validate: [
            { validator: guildLimit, message: '{PATH} exceeds the limit of ' + GUILD_LIMIT }
        ]
    },
    log: [{}]
    
}, {collection: 'campaigns', timestamps: true});

CampaignSchema.methods.getPlayers = function getPlayers(callback) {
    return this.players;
}

CampaignSchema.methods.getGuilds = function getGuilds(callback) {
    return this.guilds;
}

CampaignSchema.methods.addPlayerByCode = function addPlayerByCode(user_id, guild_id, callback) {
    
    // look for first available null spot in the players array
    // if there are no empty spots available we do not want to save the guild.code
    for(var i = 0; i < this.players.length; i++){
      
      if( i == this.players.length-1 && this.players[i] !== null ){
        var err = new Error('Campaign is full')
        err.campaignFull = true
      } else {
        if( this.players[i] === null ){
          this.players[i] = { player: user_id, guild: guild_id }
          i = this.players.length
        }
      }
      
    }
        
    return callback(err,this.players)
}


CampaignSchema.statics.addPlayerByCode_STATIC = function(code, user_id, guild_id, callback) {
  this.findOne({ code: code }, function(err, campaign) {
    
    if(err)
      return  err
    
    if(!campaign) {
      err = new Error('CampaignSchema')
      err.campaignFound = false
    } else if(campaign.players.indexOf(null) === -1) {
      err = new Error('CampaignSchema')
      err.campaignFull = true
    } else {
      campaign.players[campaign.players.indexOf(null)] = { player: user_id, guild: guild_id }
      campaign.save()
    }
    
    callback(err, campaign)
    
    
  })
};

CampaignSchema.statics.findByCode = function(code, callback) {
  return this.findOne({ code: code }, callback)
};

function guildLimit(val) {
  return val.length <= GUILD_LIMIT;
}

module.exports = mongoose.model('Campaign', CampaignSchema);

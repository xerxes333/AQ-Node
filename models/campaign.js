var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GUILD_LIMIT = 4;

var CampaignSchema   = new Schema({
    name: { type: String, required: true },
    created_by: { type : Schema.ObjectId, ref: 'User', required: true },
    description: String,
    players: {
        type: [{type: Schema.ObjectId, ref: 'User'}],
        validate: [guildLimit, '{PATH} exceeds the limit of ' + GUILD_LIMIT]
    },
    guilds: {
        type: [{type: Schema.ObjectId, ref: 'Guild'}],
        validate: [guildLimit, '{PATH} exceeds the limit of ' + GUILD_LIMIT]
    }
    
}, {collection: 'campaigns', timestamps: true});

CampaignSchema.methods.getPlayers = function getPlayers(callback) {
    return this.players;
}

CampaignSchema.methods.getGuilds = function getGuilds(callback) {
    return this.guilds;
}

function guildLimit(val) {
  return val.length <= GUILD_LIMIT;
}

module.exports = mongoose.model('Campaign', CampaignSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Campaign = require('./campaign');

var GuildSchema   = new Schema({
    name: { type: String, required: true },
    user_id: { type : Schema.ObjectId, ref: 'User', required: true },
    description: String,
    type: String,
    code: String,
    campaign: { type : Schema.ObjectId, ref: 'Campaign' },
    heroes: [{
        _id: false,
        hero_id: {type : Schema.ObjectId, ref: 'Hero'},
        items: [
            {type : Schema.ObjectId, ref: 'Item'},
        ]
    }],
    
}, {collection: 'guilds', timestamps: true});

GuildSchema.pre('save', function(next) {

  // if we are assigning the guild to campaign based on a share code
  if(this.code){
    
    var self = this
    
    // Append guild user id to the campaign players array
    // and the guild id to the campaign guilds array
    Campaign.findOneAndUpdate(
      { code: self.code || "" },  // find campaign based on share code
      { $addToSet: {players: self.user_id, guilds: self._id} }, // append data
      function(err,campaign){
        
        self.code = undefined // always unset the guild code
        
        if (err){ // something goes wrong leave guild campaign as is or undefined
          self.campaign = self.campaign || undefined 
        } else {  // assign the campaign id to the guild campaign
          self.campaign = campaign._id 
        }
        
        next()
        
      })
      
  } else {
    next()
  }
  
  
});

GuildSchema.methods.getHeroes = function getHeroes(callback) {
    return this.heroes;
}

GuildSchema.methods.getItems = function getItems(hero_id, callback) {
    var hero = this.heroes.find(function(hero){
        return hero.hero_id == hero_id;
    });
    return hero.items;
}

module.exports = mongoose.model('Guild', GuildSchema);
// console.log(req.decoded._doc);

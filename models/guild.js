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
    coin: Boolean,
    heroes: [{
        _id: false,
        hero_id: {type : Schema.ObjectId, ref: 'Hero'},
        items: [
            {type : Schema.ObjectId, ref: 'Item'},
        ],
        curses: [
            {type : Schema.ObjectId, ref: 'Curse'},
        ]
    }],
    pets: [{
        _id: false,
        pet_id: {type : Schema.ObjectId, ref: 'Pet'},
        items: [
            {type : Schema.ObjectId, ref: 'Item'},
        ]
    }],
    
}, {collection: 'guilds', timestamps: true});

GuildSchema.pre('save', function(next) {
  
  // if we are assigning the guild to campaign based on a share code
  if(this.code && this.code !== ""){
    
    var self = this
    
    Campaign.addPlayerByCode_STATIC(self.code, self.user_id, self._id, (err, campaign)=>{
      if(!err) self.campaign = campaign._id
      next(err)
    })
    
  } else {
    next()
  }
  
});

GuildSchema.methods.getHeroes = function getHeroes(callback) {
    return this.heroes;
}

GuildSchema.methods.getPets = function getPets(callback) {
    return this.pets;
}

GuildSchema.methods.getItems = function getItems(hero_id, callback) {
    var hero = this.heroes.find(function(hero){
        return hero.hero_id == hero_id;
    });
    return hero.items;
}

GuildSchema.methods.getCurses = function getCurses(hero_id, callback) {
    var hero = this.heroes.find(function(hero){
        return hero.hero_id == hero_id;
    });
    return hero.curses;
}

module.exports = mongoose.model('Guild', GuildSchema);
// console.log(req.decoded._doc);

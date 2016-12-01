var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuildSchema   = new Schema({
    name: { type: String, required: true },
    user_id: { type : Schema.ObjectId, ref: 'User', required: true },
    description: String,
    heroes: [{
        _id: false,
        hero_id: {type : Schema.ObjectId, ref: 'Hero'},
        items: [
            {type : Schema.ObjectId, ref: 'Item'},
        ]
    }],
    
}, {collection: 'guilds', timestamps: true});

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

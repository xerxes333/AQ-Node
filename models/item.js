var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
    number: String,
    name: String,
    price: Number,
    class: String,
    type:String,
    atk: Number,
    hp: Number,
    def: Number,
    roll: Number,
    description: String,
    image: String
    
}, {collection: 'items'});

module.exports = mongoose.model('Item', ItemSchema);
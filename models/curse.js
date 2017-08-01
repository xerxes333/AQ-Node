var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CurseSchema   = new Schema({
    number: String,
    name: String,
    // set: String,
    value: Number,
    description: String
    
}, {collection: 'curses'});

module.exports = mongoose.model('Curse', CurseSchema);
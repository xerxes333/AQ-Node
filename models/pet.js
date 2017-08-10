// import mongoose from 'mongoose';
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var PetSchema   = new Schema({
    name: String,
    defense: Number,
    health: Number,
    ability: String,
    effect: String,
    image: String,
    level: Number
    
}, {collection: 'pets'});

module.exports = mongoose.model('Pet', PetSchema);
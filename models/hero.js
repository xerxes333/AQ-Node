// import mongoose from 'mongoose';
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
// would be in ES5: var React = require('react/addons');
// import React from 'react/addons';


var HeroSchema   = new Schema({
    name: String,
    defense: Number,
    health: Number,
    ability: String,
    effect: String,
    image: String
    
}, {collection: 'hero1'});

module.exports = mongoose.model('Hero', HeroSchema);
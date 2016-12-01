/**
* Hero Controller
*/

// Load required packages
var Hero = require('../models/hero');


exports.getHeroes = function(req, res) {
    Hero.find(function(err, heroes) {
        if (err)
            res.send(err);

        res.json(heroes);
    });
};


exports.getHero = function(req, res) {
    Hero.findById(req.params.hero_id, function(err, hero) {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Hero Found', hero: hero });
    });
};

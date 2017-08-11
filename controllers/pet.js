/**
* Pet Controller
*/

// Load required packages
var Pet = require('../models/pet');


exports.getPets = function(req, res) {
    Pet.find(function(err, pets) {
        if (err)
            res.send(err);

        res.json(pets);
    }).sort({level:1, name:1});
};


exports.getPet = function(req, res) {
    Pet.findById(req.params.pet_id, function(err, pet) {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Pet Found', pet: pet });
    });
};

/**
* Curses Controller
*/

// Load required packages
var Curse = require('../models/curse');

/**
* Creates a new curse. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postCurses = function(req, res) {
    var curse = new Curse();      // create a new instance of the Curse model
    curse.name = req.body.name;  // set the Curse name (comes from the request)

    // save the curse and check for errors
    curse.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: curse.name + ' Curse created!' });
    });
};


exports.getCurses = function(req, res) {
    Curse.find(function(err, curses) {
        if (err)
            res.send(err);

        res.json(curses);
    });
};


exports.getCurse = function(req, res) {
    Curse.findById(req.params.curse_id, function(err, curse) {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Curse Found', curse: curse });
    });
};

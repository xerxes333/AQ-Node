/**
* Public Controller
*/

exports.index = function(req, res) {
    res.locals.msg = "HOME";
    res.render('home');
};

exports.guilds = function(req, res) {
    res.locals.msg = "GUILDS";
    res.render('guilds');
};

exports.heroes = function(req, res) {
    res.locals.msg = "HEROES";
    res.render('heroes');
};

exports.items = function(req, res) {
    res.locals.msg = "ITEMS";
    res.render('items');
};


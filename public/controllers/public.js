/**
* Public Controller
*/

exports.index = function(req, res) {
    res.locals.msg = "test";
    res.render('home');
};

exports.heroes = function(req, res) {
    res.locals.msg = "HEROES";
    res.render('heroes');
};

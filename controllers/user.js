/**
* Users Controller
*/

// Load required packages
var User = require('../models/user');

exports.postUsers = function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;

    // need to check if the user already exists
    
    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({success: true, message: 'User Created'});
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};


exports.initUsers = function(req, res) {
    User.findOne({name: 'Jeremy Draxler'},function(err, user) {    
        if (err)
            res.send(err);
        if (!user){
            var user = new User({
                name: 'Jeremy Draxler', 
                password: 'password',
                admin: true 
            });
            
            user.save(function(err) {
                if (err)
                    res.send(err);
    
                res.json({ success: true, message: 'User ' +  user.name + ' created!' });
            });
            
            res.json(user);
        } else {
            res.json({ success: false, message: 'init already completed' });
        }
    });
};


exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json({ success: true, user: user });
    });
};

exports.putUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {

        if (err)
            res.send(err);

        user.name = req.body.name;  // update the users info

        // save the user
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User updated!' });
        });

    });
};

exports.deleteUser = function(req, res) {
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ success: true, message: 'User deleted' });
    });
};

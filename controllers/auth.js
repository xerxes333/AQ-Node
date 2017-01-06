/**
* Auth Controller
*/

// Load required packages
var jwt     = require('jsonwebtoken');
var User    = require('../models/user');
var config  = require('../config/app');

exports.postAuth = function(req, res) {
    if(!req.body.name || !req.body.password)
        return res.json({ success: false, message: 'Authentication failed' });
        
    User.findOne({name: req.body.name}, function(err, user) {
        if (err) 
            res.send(err);
            
        // No user found with that username
        if (!user) 
            res.json({ success: false, message: 'Authentication failed. User not found.' });

        // Make sure the password is correct
        user.verifyPassword(req.body.password, function(err, isMatch) {
            if (err)
                res.send(err);
        
            // Password did not match
            if (!isMatch)
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        
            // Success
            var token = jwt.sign(user, config.secret, {expiresIn: '24 hours'});
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        });

    });
};
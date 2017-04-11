/**
* Auth Controller
*/

// Load required packages
var jwt     = require('jsonwebtoken');
var User    = require('../models/user');
var config  = require('../config/app');

exports.postAuth = function(req, res) {
    
    if(!req.body.email || !req.body.password)
        return res.json({ success: false, message: 'Authentication failed' });
        
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        if (err) 
            res.status(500).send(err);
            
        // No user found with that username
        if (!user) 
            return res.json({ success: false, message: 'Authentication failed. User not found.' });

        // Make sure the password is correct
        user.verifyPassword(req.body.password, function(err, isMatch) {
            if (err)
                res.status(500).send(err);
        
            // Password did not match
            if (!isMatch)
                return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            
            // Success
            var safeInfo = {
                _id: user._id,
                isAdmin: user.admin,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            };
            
            var token = jwt.sign(safeInfo, config.secret, {expiresIn: '60 minutes'});
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        });

    });
};
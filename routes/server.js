var express = require('express');
var router  = express.Router();
var jwt     = require('jsonwebtoken');
var config  = require('../config/app');

router.use(function(req, res, next) {
    console.log('============================================================');
    console.log('Something is happening in routes/server.js.');
    
    if(    (req.path == '/auth' && req.method == 'POST')
        || (req.path == '/users' && req.method == 'POST')
        || (req.path == '/users/init' && req.method == 'GET')
        || (req.path == '/')
        || (req.path == '/help')
        || (req.path == '/heroes' && req.method == 'GET')
        || (req.path == '/items' && req.method == 'GET')
    ) {
        next();
    } else {
    
        // get the user token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate user token.' });    
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
    
    }
    
});

module.exports = router;
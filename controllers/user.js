/**
* Users Controller
*/

// Load required packages
var jwt  = require('jsonwebtoken');
var User = require('../models/user');
var config  = require('../config/app');

exports.postUsers = function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    // save the user
    user.save(function(err) {
        if (err) res.send(err);
        res.json({success: true, message: 'User Created', user: user});
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
                email: 'jdraxler@gmail.com', 
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

exports.getProfile = function(req, res) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var decoded = jwt.verify(token, config.secret);
    
    User.findById(decoded._id, function(err, user) {
        if (err)
            res.send(err);
        res.json({ success: true, user: user });
    })
    .select({ password: 0 })
    .populate('friends', '_id name');
};

exports.putUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {

    if (err) res.send(err);
    
    // make sure the user owns the user
    if(user._id != req.decoded._id)
      res.send({ success: false, message: 'You do not have permission to update this account' });    
    
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    
    // TODO: rework the way this is done.  I should probably make a seperate API
    // endpoint for users/:user_id/addfriend or something along those lines
    
    User.findOne({email: req.body.friendEmail},function(err, friend){
      if (err) res.send(err);
      
      if(friend && user.friends.indexOf(friend._id) === -1)
        user.friends.push(friend._id)

      // save the user
      user.save(function(err, user) {
        if (err) res.send(err);
        
        var msg = 'User updated'
        var success = true
        
        // if we are only adding a friend
        if(req.body.friendEmail)
          if(friend) {
            msg = 'Friend Added'
          }
          else {
            msg = 'Friend not found'
            success = false
          }
            
        
        User.populate(user,[{ path: 'friends', select: '_id name' }],function(err, user){
          if (err) res.status(500).send(err);
          res.json({ success: success, message: msg, user: user });
        })
        
      });
    })

  })
};

exports.deleteUser = function(req, res) {
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ success: true, message: 'User deleted' });
    });
};

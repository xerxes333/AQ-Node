var path    = require('path');
var express = require('express');

var oneDay = 86400000;
express.static(path.join(__dirname, '..'), { maxAge: oneDay });

var router  = express.Router();



// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in public/routes/public.js.');
  console.log(path.join(__dirname, '..'));
  next();
});

router.route('/')
    .get(function(req, res) {
        res.render('home');
    });

module.exports = router;
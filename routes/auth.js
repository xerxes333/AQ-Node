var express = require('express');
var router  = express.Router();
var authController = require('../controllers/auth');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/users.js.');
  next();
});

router.route('/')
    .post(authController.postAuth);

module.exports = router;
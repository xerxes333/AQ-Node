var express = require('express');
var router  = express.Router();
var userController = require('../controllers/user');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/users.js.');
  next();
});

router.route('/')
    .post(userController.postUsers)
    .get(userController.getUsers);
router.route('/init')
    .get(userController.initUsers);
router.route('/:user_id')
    .get(userController.getUser);
    // .put(userController.putUser)  // currently not exposing this endpoint
    // .delete(userController.deleteUser); // currently not exposing this endpoint

module.exports = router;
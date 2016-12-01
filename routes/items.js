var express = require('express');
var router  = express.Router();
var itemController = require('../controllers/item');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/items.js.');
  next();
});

router.route('/')
    // .post(itemController.postItems) // currently not exposing this endpoint
    .get(itemController.getItems);

    
router.route('/:item_id')
    .get(itemController.getItem);

module.exports = router;
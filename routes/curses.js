var express = require('express');
var router  = express.Router();
var curseController = require('../controllers/curse');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/curses.js.');
  next();
});

router.route('/')
    .get(curseController.getCurses);

    
router.route('/:curse_id')
    .get(curseController.getCurse);

module.exports = router;
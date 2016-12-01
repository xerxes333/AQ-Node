var express = require('express');
var router  = express.Router();
var heroController = require('../controllers/hero');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/heroes.js.');
  next();
});

router.route('/')
    .get(heroController.getHeroes);
    
router.route('/:hero_id')
    .get(heroController.getHero);
    
module.exports = router;
var path    = require('path');
var express = require('express');
var router  = express.Router();
var publicController = require('../controllers/public');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in public/routes/public.js.');
  next();
});

router.route('/')
    .get(publicController.index);

router.route('/guilds')
    .get(publicController.guilds);
router.route('/guilds/:guild_id')
    .get(publicController.getGuild);
    
router.route('/heroes')
    .get(publicController.heroes);

router.route('/items')
    .get(publicController.items);
    

module.exports = router;
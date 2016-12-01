var express = require('express');
var router  = express.Router();
var guildController = require('../controllers/guild');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/guilds.js.');
  next();
});

router.route('/')
    .post(guildController.postGuilds)
    .get(guildController.getGuilds);
    
router.route('/:guild_id')
    .get(guildController.getGuild)
    .put(guildController.putGuild)
    .delete(guildController.deleteGuild);
    
module.exports = router;
var express = require('express');
var router  = express.Router();
var petController = require('../controllers/pet');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/pets.js.');
  next();
});

router.route('/')
    .get(petController.getPets);
    
router.route('/:pet_id')
    .get(petController.getPet);
    
module.exports = router;
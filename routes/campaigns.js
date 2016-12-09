var express = require('express');
var router  = express.Router();
var campaignController = require('../controllers/campaign');

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  console.log('Something is happening in routes/campaigns.js.');
  next();
});

router.route('/')
    .post(campaignController.postCampaigns)
    .get(campaignController.getCampaigns);
    
router.route('/:campaign_id')
    .get(campaignController.getCampaign)
    .put(campaignController.putCampaign)
    .delete(campaignController.deleteCampaign);
    
module.exports = router;
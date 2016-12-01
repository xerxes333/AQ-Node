/**
* Items Controller
*/

// Load required packages
var Item = require('../models/item');

/**
* Creates a new item. The method assumes that the json supplied in the request
* is properly formatted.
*/
exports.postItems = function(req, res) {
    var item = new Item();      // create a new instance of the Item model
    item.name = req.body.name;  // set the Item name (comes from the request)

    // save the item and check for errors
    item.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: item.name + ' Item created!' });
    });
};


exports.getItems = function(req, res) {
    Item.find(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};


exports.getItem = function(req, res) {
    Item.findById(req.params.item_id, function(err, item) {
        if (err)
            res.send(err);
        res.json({ success: true, message: 'Item Found', item: item });
    });
};

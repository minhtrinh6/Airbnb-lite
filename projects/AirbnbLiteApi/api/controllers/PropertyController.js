'use strict';

var mongoose = require('mongoose'),
  Prop = mongoose.model('Properties');

exports.list_all_properties = function(req, res) {
  Prop.find({}, function(err, property) {
    if (err) 
      res.send(err);
    res.json(property);
  });
};

exports.list_avail_properties = function(req, res) {
  Prop.find({ "isRented": "false" }, function(err, property) {
    if (err) 
      res.send(err);
    res.json(property);
  });
};

exports.list_your_properties = function(req, res) {
  Prop.find({ "hostEmail": req.query.hostEmail }, function(err, property) {
    if (err) 
      res.send(err);
    res.json(property);
  });
};

exports.list_your_stays = function(req, res) {
  Prop.find({ "guestEmail": req.query.guestEmail }, function(err, property) {
    if (err) 
      res.send(err);
    res.json(property);
  });
};

exports.create_new_property = function(req, res) {
  var new_prop = new Prop(req.body);
  new_prop.save(function(err, property) {
    if (err)
      res.send(err);
    res.json(property);
  });
}; 

exports.get_property = function(req, res) {
  Prop.findById(req.params.propertyId, function(err, property) {
    if (err)
      res.send(err);
    res.json(property);
  });
};

exports.update_property = function(req, res) {
  Prop.findOneAndUpdate({_id: req.params.propertyId}, req.body, {new: true}, function(err, property) {
    if (err)
      res.send(err);
    res.json(property);
  });
};

exports.delete_property = function(req, res) {
  Prop.remove({_id: req.params.propertyId}, function(err, property) {
    if (err) 
      res.send(err);
    res.json({ message: 'Property successfully deleted' });
  });
};
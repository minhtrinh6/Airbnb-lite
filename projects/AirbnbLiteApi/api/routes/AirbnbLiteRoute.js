'use strict';
module.exports = function(app) {
  var usr = require('../controllers/UserController');
  var prop = require('../controllers/PropertyController');
  var jwt = require('jsonwebtoken')

  app.route('/users')
    .get(usr.list_all_users);

  app.route('/users/signup')
    .post(usr.create_new_user);

  app.route('/users/signin')
    .post(usr.find_user);

  app.route('/users/:userId')
    .get(usr.get_user)
    .patch(usr.update_user)
    .delete(usr.delete_user);

  app.route('/properties')
    .get(prop.list_avail_properties)
  
  app.route('/properties/add')
    .post(prop.create_new_property);

  app.route('/properties/:propertyId')
    .get(prop.get_property)
    .patch(prop.update_property)
    .delete(prop.delete_property);

  app.route('/all-properties')
    .get(prop.list_all_properties);

  app.route('/your-properties')
    .get(prop.list_your_properties);

  app.route('/your-stays')
    .get(prop.list_your_stays);
};
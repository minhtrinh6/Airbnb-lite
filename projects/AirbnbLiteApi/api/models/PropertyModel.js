'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropSchema = new Schema({
  name: {
    type: String,
    required: 'Enter property name'
  },
  type: {
    type: String,
    required: 'Enter property type'
  },
  hostEmail: {
    type: String,
    required: 'Enter an email'
  },
  isRented: {
    type: Boolean,
    default: 'false',
  },
  guestEmail: {
    type: String,
    required: function() {
      return this.isRented
    }
  },
  numberOfGuests: {
    type: Number,
    default: '1'
  }
});

module.exports = mongoose.model('Properties', PropSchema);
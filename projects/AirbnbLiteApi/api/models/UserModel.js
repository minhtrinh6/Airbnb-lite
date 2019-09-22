'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
let SALT = 10;

var UserSchema = new Schema({
  name: {
    type: String,
    required: 'Enter username'
  },
  password: {
    type: String,
    required: 'Enter password'
  },
  email: {
    type: String,
    required: 'Enter an email'
  },
  userType: {
    type: [{
      type: String,
      enum: ['Host', 'Guest']
    }],
    default: ['Guest']
  }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash){
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
}) 

UserSchema.methods.comparePassword = function(candidatePassword, checkPassword){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err)
      return checkPassword(err)
    checkPassword(null, isMatch)
  })
}

// UserSchema.statics.checkLogin = async (email, password) => {
//   const user = await User.findOne({email})

//   // if(!user){
//   //     throw new Error('Unable to login, user does not exist')
//   // }
//   // const isMatch = await bcrypt.compare(password,user.password)

//   // if(!isMatch){
//   //     throw new Error('Incorrect password')
//   // }

//   return user
// }

// UserSchema.methods.newAuthToken = async function(){
//   const user  = this
//   const token =  jwt.sign({ _id: user.id.toString() },'secretKey', {expiresIn: "7 days"})
//   user.tokens = user.tokens.concat({ token })
//   await user.save()
//   return token
// }

module.exports = mongoose.model('Users', UserSchema);
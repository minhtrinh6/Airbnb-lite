'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  validateRegisterInput = require('../../validation/register'),
  validateLoginInput = require('../../validation/login'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  keys = require('../../config/keys');

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err) 
      res.send(err);
    res.json(user);
  });
};

exports.create_new_user = function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ "email": req.body.email }, function(err, user) {
    if (user)
      return res.status(400).json({ message: 'An account already exists' })
    else {
      var new_user = new User(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
      });
    }
  });
}; 

exports.find_user = function(req, res) {

  const { errors, isValid } = validateLoginInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {
    if(!user) {
      return res.status(400).json({emailnotfound: 'Email not registered'});
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 31556926},
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({passwordincorrect: "Password is incorrect"});
      }
    });
  });
  // try {
  // const user = await User.findOne({ "email": req.body.email })
  // if (!user)
  //   return res.send('Login failed, user not found');
  // console.log(user)
  // const isMatch =  bcrypt.compare(req.body.password,user.password)
  // console.log(isMatch)
  // if(!isMatch)
  //     return res.send('Incorrect password')
  //   const payload = {
  //     id: user.id,
  //     name: user.name
  //   };
  //   const token = jwt.sign(
  //     payload,
  //     keys.secretOrKey,
  //     {
  //       expiresIn: 31556926
  //     },
  //     (err, token) => {
  //       console.log({ token })
  //       res.json({
  //         token: token
  //       });
  //     }
  //   );
  // }
  // catch {
  //   res.status(400).send()
  // }
};

exports.get_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_user = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_user = function(req, res) {
  User.remove({_id: req.params.userId}, function(err, user) {
    if (err) 
      res.send(err);
    res.json({ message: 'Account successfully deleted' });
  });
};
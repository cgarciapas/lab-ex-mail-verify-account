const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = require('../configs/email.config');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('users/list', {
        users: users
      });
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        user = new User ({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          location: {
            type: 'Point',
            coordinates: [req.body.longitude, req.body.latitude]
          },
          token: crypto.randomBytes(64).toString('hex')
        });
        return user.save()
          .then(user => {
            transporter.sendMail({
              from: '"My Awesome Project 👻" <garciapascual.clara@gmail.com>',
              to: 'garciapascual.clara@gmail.com', 
              subject: 'Awesome Subject', 
              text: 'Awesome Message',
              html: '<b>Awesome Message</b>'
            })
            .then(info => console.log(info))
            .catch(error => console.log(error))
            res.redirect('/sessions/create');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/create', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
}


module.exports.doDelete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/users');
      }
    })
    .catch(error => next(error));
}
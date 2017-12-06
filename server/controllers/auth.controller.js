require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const debug = require('debug')('server:'+ path.basename(__filename));
//const mongoose = require('mongoose');
//const Promise = require('bluebird');
//const emailVerification = require('email-verification');

const User = require('./../models/user.model');
const Token = require('./../models/token.model');
//const nevConfig = require('./../config/nev.config');

//const nev = Promise.promisifyAll(emailVerification(mongoose));
//nevConfig.config(nev);

module.exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Provide username, email and password.' });
    return;
  }

  User.findOne({ username }, '_id')
    .then(user => {
      if (user) {
        res.status(400).json({ message: 'User information provided already exists.' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        email: email,
        password: hashPass
      });

      return newUser.save();  // Save the new user and login
      //return newUser;  // Return the new user and send verificatin email
    })
    .then(newUser => {
      const token = new Token({
        user: newUser.id,
        token: crypto.randomBytes(16).toString('hex')
      });

      token.save()
        .then(() => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.serverEmail,
              pass: process.env.serverEmailPassword
            }
          });

          const mailOptions = {
            from: 'no-reply@yourwebapplication.com',
            to: newUser.email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/auth\/verification\/' + token.token + '.\n'
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).json({ message: 'Error sending verification email.' });
              return;
            }

            res.status(200).json({
              message: `Verification email sent correctly to ${newUser.email}.`,
              info: info
            });
          });
        })
        .catch(error => {
          res.status(500).json({ message: 'Error while creating verification token.' });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({ message: 'Something went wrong creating new user.' });
      return;
    });
};

module.exports.login = (req, res, next) => {
  const username = req.body.username;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.status(401).json({ msg: 'Username not found.' });
        return;
      }

      if (!user.isVerified) {
        res.status(401).json({
          type: 'not-verified',
          msg: 'User not verified yet.'
        });
        return;
      } else {
        passport.authenticate('local', (error, user, failureDetails) => {
          if (error) {
            res.status(500).json({
              message: 'Something went wrong with authentication.' + error
            });
            return;
          }

          if (!user) {
            res.status(401).json(failureDetails);
            return;
          }

          req.login(user, (error) => {
            if (error) {
              res.status(500).json({
                message: 'Something went wrong when login.'
              });
              return;
            }

            res.status(200).json(req.user);
          });
        })(req, res, next);
      }
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error fetching user data.' });
      return;
    })
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Successfully logged out.' });
};

module.exports.isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized.' });
  return;
};

module.exports.verification = (req, res, next) => {
  const token = req.params.token;
  Token.findOne({ token: token })
    .then(token => {
      if (!token) {
        res.status(400).json({
          type: 'not-verified',
          message: 'Unable to find valid token. It may have expired.'
        });
        return;
      }

      User.findOne({ _id: token.user })
        .then(user => {
          if (!user) {
            res.status(400).json({
              message: 'Unable to find a user for provided token.'
            });
            return;
          }

          if (user.isVerified) {
            res.status(400).json({
              type: 'already-verified',
              msg: 'User already verified.'
            });
            return;
          }

          user.isVerified = true;
          user.save()
            .then(() => {
              res.status(200).json({ message: 'The account has been verified.' });
            })
            .catch(error => {
              res.status(500).json({ message: 'Error saving verified user.' });
              return;
            });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error ocurred fetching user with token.'
          });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error ocurred fetching token.'
      });
      return;
    });
};

module.exports.resend = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).json({ msg: 'Unable to find user with that email.' });
        return;
      }

      if (user.isVerified) {
        res.status(400).json({ msg: 'User already verified.' });
        return;
      }

      const token = new Token({
        user: user.id,
        token: crypto.randomBytes(16).toString('hex')
      });

      token.save()
        .then(() => {
          const transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: process.env.serverEmail,
               pass: process.env.serverEmailPassword
             }
          });
          const mailOptions = {
             from: 'no-reply@bitcoinbitacora.com',
             to: user.email,
             subject: 'Account Verification Token',
             text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verification\/' + token.token + '.\n'
          };

          transporter.sendMail(mailOptions, error => {
            if (error) {
              res.status(500).json({ msg: 'Error resending email.' });
              return;
            }

            res.status(200).json({ msg: 'Verification email resend.' });
          });
        })
        .catch(error => {
           res.status(500).json({ msg: 'Error creating new token.' });
           return;
        });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Error ocurred fetching user.' });
      return;
    });
};

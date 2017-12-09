const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./../config/nodemailer.config');
const User = require('./../models/user.model');
const Token = require('./../models/token.model');

module.exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ msg: 'Provide username, email and password.' });
    return;
  }

  User.findOne({ username }, '_id')
    .then(user => {
      if (user) {
        res.status(400).json({ msg: 'User information provided already exists.' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        email: email,
        password: hashPass
      });

      return newUser.save();
    })
    .then(newUser => {
      const token = new Token({
        user: newUser.id,
        token: crypto.randomBytes(16).toString('hex')
      });

      token.save()
        .then(() => {
          const transporter = nodemailer.createTransport(nodemailerConfig.transporter);
          const mailOptions = nodemailerConfig.mailOptions(req, newUser, token);

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(500).json({ msg: 'Error sending verification email.' });
              return;
            }

            res.status(200).json({
              msg: `Verification email sent correctly to ${newUser.email}.`,
              info: info
            });
          });
        })
        .catch(error => {
          res.status(500).json({ msg: 'Error while creating verification token.' });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Something went wrong creating new user.' });
      return;
    });
};

module.exports.login = (req, res, next) => {
  const username = req.body.username;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log(user);
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
              msg: 'Something went wrong with authentication.' + error
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
                msg: 'Something went wrong when login.'
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
  res.status(200).json({ msg: 'Successfully logged out.', user: req.user });
  return;
};

module.exports.isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ msg: 'Unauthorized.' });
  return;
};

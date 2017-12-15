require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./../config/nodemailer.config');
const User = require('./../models/user.model');
const Token = require('./../models/token.model');

module.exports.verification = (req, res, next) => {
  const token = req.params.token;

  Token.findOne({ token: token })
    .then(token => {
      if (!token) {
        res.status(400).json({
          type: 'not-verified',
          msg: 'Unable to find valid token. It may have expired.'
        });
        return;
      }

      User.findOne({ _id: token.user })
        .then(user => {
          if (!user) {
            res.status(400).json({
              msg: 'Unable to find a user for provided token.'
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
              res.status(200).json({ msg: 'The account has been verified.' });
              return;
            })
            .catch(error => {
              res.status(500).json({ msg: 'Error saving verified user.' });
              return;
            });
        })
        .catch(error => {
          res.status(500).json({
            msg: 'Error ocurred fetching user with token.'
          });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({
        msg: 'Error ocurred fetching token.'
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
          const transporter = nodemailer.createTransport(nodemailerConfig.transporter);
          const mailOptions = nodemailerConfig.mailOptions(req, newUser, token);

          transporter.sendMail(mailOptions, error => {
            if (error) {
              res.status(500).json({ msg: 'Error resending email.' });
              return;
            }

            res.status(200).json({ msg: 'Verification email resend.' });
            return;
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

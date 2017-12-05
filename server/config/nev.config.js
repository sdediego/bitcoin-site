require('dotenv').config();
const bcrypt = require('bcrypt'),
const mongoose = require('mongoose');
const Promise = require('bluebird'),
const emailVerification = require('email-verification');
const User = require('./../models/user.model');

module.exports.promiseError = class PromiseError extends Error {
  constructor(message) {
    this.name = 'PromiseError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
};

module.exports.nevConfig = (mongoose) => {
  const nev = Promise.promisifyAll(emailVerification(mongoose));
  require('./db.config')(mongoose);

  function myHasher(password, tempUserData, insertTempUser, callback) {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    return insertTempUser(hashPass, tempUserData, callback);
  }

  nev.configureAsync({
      persistentUserModel: User,
      expirationTime: 10 * 60  // seconds
      verificationURL: `${process.env.domainURL}/api/auth/email-verification/${URL}`,
      transportOptions: {
        service: 'Gmail',
        auth: {
          user: process.env.serverEmail,
          pass: process.env.serverEmailPassword
        }
      },
      hashingFunction: myHasher,
      passwordFieldName: 'password',
    })
    .then(options => {
      console.log('configured: ' + (typeof options === 'object'));
      return nev.generateTempUserModelAsync(User);
    })
    .then(tempUserModel => {
      console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
    })
    .catch(error => {
      console.error(error);
    });
};

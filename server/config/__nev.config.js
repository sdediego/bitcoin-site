/*require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');

module.exports.promiseError = class PromiseError extends Error {
  constructor(message) {
    this.name = 'PromiseError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
};

module.exports.config = (nev) => {

  myHasher = function(password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log('HASHING: ' + hash + "--" + tempUserData);
            return insertTempUser(hash, tempUserData, callback);
        });
    });
  };

  nev.configureAsync({
      persistentUserModel: User,
      expirationTime: 10 * 60,  // seconds
      //verificationURL: `${process.env.domainURL}/api/auth/email-verification/${URL}`,
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
      console.log('configured: ' + (typeof(options) === 'object'));
      return nev.generateTempUserModelAsync(User);
    })
    .then(tempUserModel => {
      console.log('generated temp user model: ' + (typeof(tempUserModel) === 'function'));
    })
    .catch(error => {
      console.error(error);
    });
};
*/

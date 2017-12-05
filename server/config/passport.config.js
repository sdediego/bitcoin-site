const bcrypt = require('bcrypt');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const User = require('./../models/user.model');

module.exports.setup = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      if (error) {
        done(error);
        return;
      }
      done(null, user);
    });
  });

  passport.use('local', new LocalStrategy((username, password, next) => {
    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          next(null, false, { message: 'Invalid username or password.' });
          return;
        } else {
          if (!user.checkPassword(password)) {
            console.log('Bad password');
            next(null, false, { message: 'Incorrect password:' + password });
          }
          console.log('Good password');
          next(null, user);
        }
      })
      .catch(error => next(error));
  }));
}

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden.' });
  }
}

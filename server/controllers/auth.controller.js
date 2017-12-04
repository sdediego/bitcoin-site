const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');

module.exports.signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Provide username, email and password.' });
    return;
  }

  User.findOne({ username }, '_id')
    .then(user => {
      if (user) {
        res.status(400).json({ message: 'Username already exists.' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username: username,
        email: email,
        password: password
      });

      return newUser.save();
    })
    .then(newUser => {
      // Email send to activate.
      req.login(newUser, (error) => {
        if (error) {
          res.status(500).json({ message: 'Something went wrong when login.' });
          return;
        }

        res.status(200).json(req.user);
      });
    })
    .catch(error => {
      res.status(500).json({ message: 'Something went wrong creating new user.'});
    });
};

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (error, user, failureDetails) => {
    if (error) {
      res.status(500).json({ message: 'Something went wrong with authentication.' });
      return;
    }

    if (!user) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(user, (error) => {
      if (error) {
        res.status(500).json({ message: 'Something went wrong when login.' });
        return;
      }

      res.status(200).json(req.user);
    });
  })(req, res, next);
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
};

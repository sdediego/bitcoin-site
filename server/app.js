require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('bitcoin-project:'+ path.basename(__filename));
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cors = require('cors');

const app = express();

require('./config/db.config')(mongoose);
require('./config/passport.config').setup(passport);
const corsConfig = require('./config/cors.config');

//const index = require('./routes/index');
//const users = require('./routes/users');
const indexRoutes = require('./routes/index.route')
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    secure: process.env.cookieSecure,  // https only in production
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

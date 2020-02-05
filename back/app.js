require('dotenv').config()
var express = require('express');
var session = require('express-session')
var passport = require('./auth/passport')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('NOT_A_GOOD_SECRET'));
app.use(express.static(path.join(__dirname, '../front/build')))
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'NOT_A_GOOD_SECRET',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter)

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front/build/index.html'))
})

module.exports = app;

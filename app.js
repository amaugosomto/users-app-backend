var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var helmet = require('helmet');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./components/users');
var authRouter = require('./components/auth');

var app = express();

const mongoUrl =  require("./config").mongo_url;
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log("Database Connected successfully"))
    .catch(err => console.log(err));

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;

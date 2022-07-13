const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

require('dotenv').config()

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

const usersRouter = require('./routes/users');
const filmsRouter = require('./routes/films');

const app = express();

mongoose.connect(`${connectionURL}&dbName=${databaseName}`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
})

app.set('view engine', 'ejs');

try {
  app.use('/films', filmsRouter);
} catch(e) {
  console.log(e);
}
app.use('/users', usersRouter);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  next(err);
});

module.exports = app;

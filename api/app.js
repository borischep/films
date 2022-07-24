const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");

require('dotenv').config()

const usersRouter = require('./routes/users');
const filmsRouter = require('./routes/films');
const withAuth = require('./middlewares/accessTokenAuth');

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

const app = express();

mongoose.connect(`${connectionURL}&dbName=${databaseName}`);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.use((req, res, next) => {
  next();
})

app.set('view engine', 'ejs');

try {
  app.use('/films', withAuth, filmsRouter);
} catch(e) {
  console.log(e);
}
app.use('/users', usersRouter);

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

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

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var fetch = require('node-fetch'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Route pour récupérer les coordonnées de la ville
app.get('/coordinates', async (req, res) => {
  const  city  = req.query.city;
  const apiKey = process.env.OPENCAGE_API_KEY; 
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des coordonnées' });
  }
});

// Route pour récupérer les données météo
app.get('/weather', async (req, res) => {
  const { lat, lng } = req.query;
  const apiKey = process.env.STORMGLASS_API_KEY; 
  const apiUrl = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=airTemperature,pressure,humidity,cloudCover,precipitation,visibility,windSpeed,windDirection`;

  try {
      const response = await fetch(apiUrl, {
          headers: {
              'Authorization': apiKey
          }
      });
      const data = await response.json();
      res.json(data);
  } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données météo' });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

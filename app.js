const express = require('express');
const app = express();

const morgan = require('morgan');

//middleware
const toursEndPoint = '/api/1/tours';
const usersEndPoint = '/api/1/users';

//third party middleware
app.use(morgan('dev'));
app.use(express.json());

//our own middleware
app.use((req, res, next) => {
  console.log('Hello from your own middleWare..');
  next();
});

// route handlers

const toursRouter = require('./routers/toursRoutes');
const usersRouter = require('./routers/usersRoutes');

app.use(toursEndPoint, toursRouter);
app.use(usersEndPoint, usersRouter);

module.exports = app;

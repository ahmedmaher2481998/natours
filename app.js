const express = require('express');
const app = express();

const morgan = require('morgan');

//middleware
const toursEndPoint = '/api/1/tours';
const usersEndPoint = '/api/1/users';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    console.log('Hello from your own middleWare..');
    next();
  });
}
//third party middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//our own middleware

// route handlers

const toursRouter = require('./routers/toursRoutes');
const usersRouter = require('./routers/usersRoutes');

app.use(toursEndPoint, toursRouter);
app.use(usersEndPoint, usersRouter);

module.exports = app;

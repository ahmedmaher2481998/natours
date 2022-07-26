const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const fs = require('fs');
const morgan = require('morgan');

//middleware
const toursEndPoint = '/api/1/tours';
const usersEndPoint = '/api/1/users';
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//third party middleware
app.use(morgan('dev'));
app.use(express.json());

//our own middleware
app.use((req, res, next) => {
  console.log('Hello from your own middleWare..');
  next();
});

// route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const GetTourById = (req, res) => {
  const id = +req.params.id;
  const requestedTour = tours.find((el) => el.id === id);
  if (!requestedTour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id...',
    });
  }
  return res.json({
    status: 'success',
    data: requestedTour,
  });
};

const createTour = (req, res) => {
  const newTour = {
    id: tours[tours.length - 1].id + 1,
    ...req.body,
  };
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) console.log("Couldn't write to file...");
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  });
};

const UpdateTour = (req, res) => {
  //check if tour exists
  if (req.params.id * 1 > tours.length - 1) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id...',
    });
  }
  res.status(200).json({
    status: 'success',
    body: req.body,
    data: '<Updated Tour here ...>',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length - 1) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id...',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};
//mounting the routers
const toursRouter = express.Router();
const usersRouter = express.Router();

//Tours Routes
toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route(`/:id`).get(GetTourById).patch(UpdateTour).delete(deleteTour);

//users Routes
usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route(`/:id`).get(getUser).patch(updateUser).delete(deleteUser);

app.use(toursEndPoint, toursRouter);
app.use(usersEndPoint, usersRouter);

//star the server

app.listen(port, () => {
  console.clear();
  console.log('\x1b[35m', `App running on port ${port}...`);
});

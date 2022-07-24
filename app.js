const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const morgan = require('morgan');

//middleware
const toursEnpPoint = '/api/1/tours';
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(morgan('dev'));
app.use(express.json());
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
    data: '<Updated Tour here ...',
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
// //get all tours
// app.get(`${toursEnpPoint}`, getAllTours);
// //get tour by id
// app.get(`${toursEnpPoint}/:id`, GetTourById);
// //create new tour
// app.post(`${toursEnpPoint}`, createTour);
// //patch tour
// app.patch(`${toursEnpPoint}/:id`, UpdateTour);
// // delete tour
// app.delete(`${toursEnpPoint}/:id`, deleteTour);
//routes
app.route(toursEnpPoint).get(getAllTours).post(createTour);
app.route(`${toursEnpPoint}/:id`).get(GetTourById).patch(UpdateTour).delete(deleteTour);

//star the server
app.listen(port, () => {
  console.log('App running on port' + port);
});

const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: { tours },
  // });
};

exports.GetTourById = (req, res) => {
  // const id = req.params.id * 1;
  // const requestedTour = tours.find((el) => el.id === id);
  // return res.json({
  // status: 'success',
  // data: requestedTour,
  // });
};

exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({})
    //newTour.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.UpdateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    body: req.body,
    data: '<Updated Tour here ...>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.GetTourById = async (req, res) => {
  try {
    const requestedTour = await Tour.findById(req.params.id);
    return res.json({
      status: 'success',
      data: requestedTour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err,
    });
  }
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

exports.UpdateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      body: req.body,
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, {}, () => {
      console.log('Deleted successfully');
    });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }
};

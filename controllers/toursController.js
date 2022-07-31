const Tour = require('../models/tourModel');

exports.getTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.page = '1';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,duration,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    //1A) Filtering
    //build query object using basic filters
    const queryObj = { ...req.query };
    const excludedQueries = ['page', 'sort', 'fields', 'limit'];
    excludedQueries.forEach((el) => delete queryObj[el]);

    //1B) Filtering advanced
    //refactoring the query for the advanced filters
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(lte|lt|gte|gt)\b/g,
      (match) => `$${match}`
    );

    //querying the database
    let query = Tour.find(JSON.parse(queryStr));

    //2)Sorting
    if (req.query.sort) {
      // query.sort(price duration)
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('createdAt');
    }

    //3)Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    //page request is not available
    if (req.query.page) {
      const totalDocs = await Tour.countDocuments();
      if (skip >= totalDocs) throw new Error('The page request is not found ');
    }

    //Executing the query
    //query.select().sort().skip().limit()
    const tours = await query;

    /*    const query = Tour.find()
    .where('duration')
    .equal(5)
    .where('difficulty')
    .equal('easy)
*/

    //sending the response
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

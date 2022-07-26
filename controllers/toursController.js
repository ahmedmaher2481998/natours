const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
  //check if tour exists
  if (val * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id...',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.GetTourById = (req, res) => {
  const id = req.params.id * 1;
  const requestedTour = tours.find((el) => el.id === id);
  return res.json({
    status: 'success',
    data: requestedTour,
  });
};

exports.checkBody = (req, res, next) => {
  const { body } = req;
  if (body.name && body.price) {
    next();
  } else {
    return res.status(400).json({
      status: 'Failed',
      message: 'This tour is invalid ',
    });
  }
};

exports.createTour = (req, res) => {
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

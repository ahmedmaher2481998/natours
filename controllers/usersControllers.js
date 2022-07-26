exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};
exports.checkBody = (req, res, next) => {
  console.log(req.body);
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

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Failed',
    message: 'This is route is not implemented yet ....',
  });
};

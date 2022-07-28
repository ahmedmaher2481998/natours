const express = require('express');

const router = express.Router();

const {
  GetTourById,
  UpdateTour,
  getAllTours,
  createTour,
  deleteTour,
} = require('../controllers/toursController');

// router.param('id', checkId);

//Tours Routes
router.route('/').get(getAllTours).post(createTour);
router.route(`/:id`).get(GetTourById).patch(UpdateTour).delete(deleteTour);

module.exports = router;

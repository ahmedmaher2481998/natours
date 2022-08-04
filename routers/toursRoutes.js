const express = require('express');

const router = express.Router();

const {
  GetTourById,
  UpdateTour,
  getAllTours,
  createTour,
  deleteTour,
  getTopTours,
  getTourStats,
  getMonthlyTours,
} = require('../controllers/toursController');

// router.param('id', checkId);

//Tours Routes
router.route('/top-5').get(getTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-tours/:year').get(getMonthlyTours);
router.route('/').get(getAllTours).post(createTour);
router.route(`/:id`).get(GetTourById).patch(UpdateTour).delete(deleteTour);

module.exports = router;

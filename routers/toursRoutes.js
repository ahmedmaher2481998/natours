const express = require('express');
const router = express.Router();

const {
  GetTourById,
  UpdateTour,
  getAllTours,
  createTour,
  deleteTour,
} = require('../controllers/toursController');
//Tours Routes
router.route('/').get(getAllTours).post(createTour);
router.route(`/:id`).get(GetTourById).patch(UpdateTour).delete(deleteTour);

module.exports = router;

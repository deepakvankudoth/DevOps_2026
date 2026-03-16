const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getVehicles, addVehicle, analytics } = require('../controllers/vehicleController');

router.get('/', auth, getVehicles);
router.post('/', auth, addVehicle);
router.get('/analytics', auth, analytics);

module.exports = router;

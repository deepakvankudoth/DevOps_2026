const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCameras, addCamera, deleteCamera } = require('../controllers/cameraController');

router.get('/', auth, getCameras);
router.post('/', auth, addCamera);
router.delete('/:id', auth, deleteCamera);

module.exports = router;

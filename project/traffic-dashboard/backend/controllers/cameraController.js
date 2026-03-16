const Camera = require('../models/Camera');

exports.getCameras = async (req, res) => {
  try {
    const cameras = await Camera.find().sort({ createdAt: 1 });
    res.json(cameras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addCamera = async (req, res) => {
  try {
    const { locationName } = req.body;
    if (!locationName) return res.status(400).json({ message: 'Location name required' });
    const exists = await Camera.findOne({ locationName });
    if (exists) return res.status(400).json({ message: 'Camera exists' });

    const camera = new Camera({ locationName });
    await camera.save();
    res.json(camera);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCamera = async (req, res) => {
  try {
    const camera = await Camera.findById(req.params.id);
    if (!camera) return res.status(404).json({ message: 'Camera not found' });
    await camera.remove();
    res.json({ message: 'Camera deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  locationName: { type: String, required: true, unique: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Camera = mongoose.model('Camera', cameraSchema);
module.exports = Camera;

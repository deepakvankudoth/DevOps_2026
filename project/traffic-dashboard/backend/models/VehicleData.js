const mongoose = require('mongoose');

const vehicleDataSchema = new mongoose.Schema({
  cameraLocation: { type: String, required: true },
  vehicleCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const VehicleData = mongoose.model('VehicleData', vehicleDataSchema);
module.exports = VehicleData;

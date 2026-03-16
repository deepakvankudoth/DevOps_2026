const VehicleData = require('../models/VehicleData');
const Camera = require('../models/Camera');

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleData.find().sort({ timestamp: -1 }).limit(100);
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const { cameraLocation, vehicleCount } = req.body;
    if (!cameraLocation || vehicleCount === undefined) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    const newData = new VehicleData({ cameraLocation, vehicleCount, timestamp: new Date() });
    await newData.save();
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.analytics = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const totalToday = await VehicleData.aggregate([
      { $match: { timestamp: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: '$vehicleCount' } } }
    ]);

    const perHour = await VehicleData.aggregate([
      { $match: { timestamp: { $gte: startOfToday } } },
      { $group: { _id: { $hour: '$timestamp' }, total: { $sum: '$vehicleCount' } } },
      { $sort: { _id: 1 } }
    ]);

    const perMinute = await VehicleData.aggregate([
      { $match: { timestamp: { $gte: new Date(now.getTime() - 60 * 60 * 1000) } } },
      { $group: { _id: { $minute: '$timestamp' }, total: { $sum: '$vehicleCount' } } },
      { $sort: { _id: 1 } }
    ]);

    const peakHour = perHour.reduce((best, item) => (item.total > (best.total || 0) ? item : best), {});

    res.json({
      totalToday: totalToday?.[0]?.total || 0,
      perHour,
      perMinute,
      peakHour: peakHour._id || 0,
      peakCount: peakHour.total || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

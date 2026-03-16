const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const cameraRoutes = require('./routes/cameras');
const Camera = require('./models/Camera');
const VehicleData = require('./models/VehicleData');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/cameras', cameraRoutes);

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function simulateVehicleData() {
  try {
    let cameras = await Camera.find();
    if (cameras.length === 0) {
      cameras = await Camera.insertMany([
        { locationName: 'Junction A' },
        { locationName: 'Junction B' },
        { locationName: 'Junction C' }
      ]);
    }

    const now = new Date();
    for (let camera of cameras) {
      const vehicleCount = getRandomInt(0, 25);
      const data = new VehicleData({ cameraLocation: camera.locationName, vehicleCount, timestamp: now });
      await data.save();
    }
  } catch (err) {
    console.error('Vehicle simulation error', err);
  }
}

setInterval(simulateVehicleData, 5000);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Close the running instance or choose another port by setting PORT in .env.`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});


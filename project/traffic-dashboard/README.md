# Smart Traffic Management Dashboard

Full-stack web app based on "Automatic Vehicle Counting for IoT based Smart Traffic Management System".

## Features
- JWT auth (register/login)
- protected dashboard
- bcrypt password hashing
- vehicle simulation every 5 seconds
- congestion alerts
- charts using Chart.js
- camera management
- analytics and reporting
- dark mode

## Folder Structure

- backend/
  - server.js
  - config/db.js
  - models/
  - routes/
  - controllers/
  - middleware/
- frontend/
  - login.html
  - register.html
  - dashboard.html
  - analytics.html
- public/
  - css/style.css
  - js/app.js

## Local Setup
1. Install Node.js (v18+ recommended)
2. Install MongoDB locally and run `mongod`
3. Open terminal in project folder:
   - `cd d:/DevOps_2026/project/traffic-dashboard`
   - `npm install`
4. Start backend:
   - `npm run start` (or `npm run dev` with nodemon)
5. Open browser:
   - `http://localhost:5000` -> login
   - or `http://localhost:5000/frontend/register.html`
6. View MongoDB data in Compass using URI `mongodb://127.0.0.1:27017/traffic-dashboard`

## API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/vehicles` (protected)
- `POST /api/vehicles` (protected)
- `GET /api/vehicles/analytics` (protected)
- `GET /api/cameras` (protected)
- `POST /api/cameras` (protected)
- `DELETE /api/cameras/:id` (protected)

## Usage
1. Register and login.
2. Dashboard auto-refreshes every 5 seconds.
3. Check analytics tab for trends.
4. Add/Remove cameras on dashboard.

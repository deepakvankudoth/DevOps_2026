const API_BASE = `${window.location.protocol}//${window.location.hostname}:${window.location.port || 3000}/api`;

function setToken(token) { localStorage.setItem('traffic_token', token); }
function getToken() { return localStorage.getItem('traffic_token'); }
function logout() { localStorage.removeItem('traffic_token'); window.location.href = '/frontend/login.html'; }

function goDashboard() { window.location.href = '/frontend/dashboard.html'; }

async function authRequest(url, options = {}) {
  const token = getToken();
  options.headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) options.headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, options);
  if (res.status === 401) {
    logout();
    throw new Error('Unauthorized');
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error');
  return data;
}

async function loginUser(evt) {
  evt.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  const data = await res.json();
  if (!res.ok) {
    alert(data.message || 'Login failed');
    return;
  }
  setToken(data.token);
  window.location.href = '/frontend/dashboard.html';
}

async function registerUser(evt) {
  evt.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;
  const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, confirmPassword }) });
  const data = await res.json();
  if (!res.ok) {
    alert(data.message || 'Registration failed');
    return;
  }
  setToken(data.token);
  window.location.href = '/frontend/dashboard.html';
}

function getTrafficStatus(count) {
  if (count > 40) return { text: 'Heavy Traffic', className: 'text-danger' };
  if (count > 20) return { text: 'Medium', className: 'text-warning' };
  return { text: 'Normal', className: 'text-success' };
}

async function loadDashboard() {
  if (!getToken()) { window.location.href = '/frontend/login.html'; return; }
  try {
    const vehicles = await authRequest(`${API_BASE}/vehicles`);
    const cameras = await authRequest(`${API_BASE}/cameras`);
    const analytics = await authRequest(`${API_BASE}/vehicles/analytics`);

    const totalToday = analytics.totalToday;
    const currentHourData = analytics.perHour.find(h => h._id === new Date().getHours())?.total || 0;

    const widgetData = document.querySelector('#widgetData');
    if (widgetData) {
      widgetData.innerHTML = `<div class="row">
        <div class="col-md-3 mb-3"><div class="card p-3"><h6>Total Vehicles Today</h6><h4>${totalToday}</h4></div></div>
        <div class="col-md-3 mb-3"><div class="card p-3"><h6>Vehicles This Hour</h6><h4>${currentHourData}</h4></div></div>
        <div class="col-md-3 mb-3"><div class="card p-3"><h6>Active Camera Locations</h6><h4>${cameras.length}</h4></div></div>
        <div class="col-md-3 mb-3"><div class="card p-3"><h6>Traffic Status</h6><h4>${getTrafficStatus(currentHourData).text}</h4></div></div>
      </div>`;
    }

    const tableBody = document.querySelector('#vehicleTableBody');
    if (tableBody) {
      tableBody.innerHTML = vehicles.slice(0, 20).map(v => {
        const status = getTrafficStatus(v.vehicleCount);
        return `<tr><td>${new Date(v.timestamp).toLocaleTimeString()}</td><td>${v.cameraLocation}</td><td>${v.vehicleCount}</td><td class="${status.className}">${status.text}</td></tr>`;
      }).join('');
    }

    const ctx1 = document.querySelector('#vehiclesPerMinute').getContext('2d');
    const perMinuteLabels = analytics.perMinute.map(x => x._id + 'm');
    const perMinuteValues = analytics.perMinute.map(x => x.total);
    new Chart(ctx1, { type: 'line', data: { labels: perMinuteLabels, datasets: [{ label: 'Vehicles Per Minute', data: perMinuteValues, backgroundColor: 'rgba(13,110,253,0.2)', borderColor: '#0d6efd', fill: true }] }, options: { responsive: true } });

    const ctx2 = document.querySelector('#trafficDensity').getContext('2d');
    const densityLabels = analytics.perHour.map(x => x._id + ':00');
    const densityValues = analytics.perHour.map(x => x.total);
    new Chart(ctx2, { type: 'bar', data: { labels: densityLabels, datasets: [{ label: 'Traffic Density', data: densityValues, backgroundColor: 'rgba(25,135,84,0.6)' }] }, options: { responsive: true } });

    const ctx3 = document.querySelector('#dailyTrend').getContext('2d');
    new Chart(ctx3, { type: 'line', data: { labels: densityLabels, datasets: [{ label: 'Daily Trend', data: densityValues, backgroundColor: 'rgba(220,53,69,0.2)', borderColor: '#dc3545', fill: true }] }, options: { responsive: true } });

    const alertBox = document.querySelector('#alertBox');
    if (alertBox) {
      const alert = getTrafficStatus(currentHourData);
      alertBox.innerHTML = `<div class="alert ${alert.className === 'text-danger' ? 'alert-danger' : alert.className === 'text-warning' ? 'alert-warning' : 'alert-success'}" role="alert">Traffic status is <strong>${alert.text}</strong> for this hour</div>`;
    }

  } catch (err) {
    console.error(err);
    alert('Failed to load dashboard. Try login again.');
    logout();
  }
}

async function loadAnalytics() {
  if (!getToken()) return window.location.href = 'login.html';
  try {
    const analytics = await authRequest(`${API_BASE}/vehicles/analytics`);
    document.querySelector('#dailyCount').textContent = analytics.totalToday;
    document.querySelector('#peakHour').textContent = `${analytics.peakHour}:00 (${analytics.peakCount} vehicles)`;

    const ctx = document.querySelector('#analyticsChart').getContext('2d');
    const labels = analytics.perHour.map(x => x._id + ':00');
    const values = analytics.perHour.map(x => x.total);
    new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: 'Daily Vehicle Count', data: values, borderColor: '#0d6efd', backgroundColor: 'rgba(13,110,253,0.2)', fill: true }] }, options: { responsive: true } });
  } catch (err) {
    console.error(err);
    logout();
  }
}

async function loadCameras() {
  try {
    const cameras = await authRequest(`${API_BASE}/cameras`);
    const camList = document.querySelector('#cameraList');
    if (!camList) return;
    camList.innerHTML = cameras.map(cam => `<li class="list-group-item d-flex justify-content-between align-items-center">${cam.locationName}<button class="btn btn-sm btn-danger" onclick="deleteCamera('${cam._id}')">Delete</button></li>`).join('');
  } catch (err) {
    console.error(err);
  }
}

async function addCamera(evt) {
  evt.preventDefault();
  const locationName = document.querySelector('#cameraLocation').value.trim();
  if (!locationName) return;
  await authRequest(`${API_BASE}/cameras`, { method: 'POST', body: JSON.stringify({ locationName }) });
  document.querySelector('#cameraLocation').value = '';
  loadCameras();
}

async function deleteCamera(id) {
  await authRequest(`${API_BASE}/cameras/${id}`, { method: 'DELETE' });
  loadCameras();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'on' : 'off');
}

function loadDarkMode() {
  if (localStorage.getItem('darkMode') === 'on') document.body.classList.add('dark-mode');
}

if (window.location.pathname.endsWith('dashboard.html')) {
  window.addEventListener('DOMContentLoaded', () => { loadDarkMode(); loadDashboard(); setInterval(loadDashboard, 5000); loadCameras(); });
}
if (window.location.pathname.endsWith('analytics.html')) {
  window.addEventListener('DOMContentLoaded', () => { loadDarkMode(); loadAnalytics(); });
}

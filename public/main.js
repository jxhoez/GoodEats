document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map-container').setView([51.505, -0.09], 2);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  });
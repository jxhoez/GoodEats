document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map (Placeholder for now)
  initMap();

  // Event listener for region filter
  d3.select("#region-filter").on("change", function() {
    const selectedRegion = d3.select(this).property("value");
    updateCuisineInfo(selectedRegion);
  });
});

function initMap() {
  const map = L.map('map-container').setView([20, 0], 2); // Set initial view to a global view

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Placeholder for adding interactivity (e.g., click events on the map)
  map.on('click', onMapClick);
}

function onMapClick(e) {
  // Placeholder function for handling map click events
  // Here you might determine the clicked region and update the cuisine information accordingly
  console.log("Map clicked at: ", e.latlng);
  // Update the cuisine information based on the clicked location
  // updateCuisineInfo(clickedRegion); // Implement this function based on your data and requirements
}

function updateCuisineInfo(region) {
  // Placeholder function to update the cuisine information based on the selected region
  // This will be replaced with actual code to fetch and display cuisine data
  if (region) {
    d3.select("#cuisine-details").text(`Information about cuisine from ${region} will be displayed here.`);
  } else {
    d3.select("#cuisine-details").text("Select a region to see details.");
  }

    // Modal functionality
    var modal = document.getElementById("welcome-modal");
    var closeButton = document.querySelector(".close-button");
  
    window.onload = function() {
      modal.style.display = "block";
    }
  
    closeButton.onclick = function() {
      modal.style.display = "none";
    }
  
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
}


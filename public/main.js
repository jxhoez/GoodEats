let globalMealsData = []; // This will hold your meals data

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            globalMealsData = data.meals; // Store the meals data globally
            initMap(globalMealsData);

        const categories = ['Beef', 'Breakfast', 'Chicken', 'Goat', 'Lamb', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'];
        const areas = ['British', 'Malaysian', 'Indian', 'Russian', 'American', 'Mexican', 'Japanese', 'French', 'Jamaican', 'Chinese', 'Dutch', 'Polish', 'Irish', 'Filipino', 'Tunisian', 'Croatian', 'Egyptian', 'Greek', 'Italian', 'Kenyan', 'Moroccan', 'Portuguese', 'Spanish', 'Thai', 'Vietnamese'];

        const categorySelect = document.getElementById('category-select');
        const areaSelect = document.getElementById('area-select');

        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.toLowerCase();
          option.textContent = category;
          categorySelect.appendChild(option);
        });

        areas.forEach(area => {
          const option = document.createElement('option');
          option.value = area.toLowerCase();
          option.textContent = area;
          areaSelect.appendChild(option);
        });
    });



    // Event listener for the Apply Filters button
 document.getElementById('apply-filters-btn').addEventListener('click', applyFilter);
    // Add event listeners for other filters
});

function initMap(meals) {
  const map = L.map('map-container').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Define markers for different regions
  const regions = {
    "British": [51.509865, -0.118092],
    "Malaysian": [4.210484, 101.975766],
    "Indian": [20.593684, 78.96288],
    "Russian": [61.52401, 105.318756],
    "American": [37.09024, -95.712891],
    "Mexican": [23.634501, -102.552784],
    "Japanese": [36.204824, 138.252924],
    "French": [46.227638, 2.213749],
    "Jamaican": [18.109581, -77.297508],
    "Chinese": [35.86166, 104.195397],
    "Dutch": [52.132633, 5.291266],
    "Polish": [51.919438, 19.145136],
    "Irish": [53.41291, -8.24389],
    "Filipino": [12.879721, 121.774017],
    "Tunisian": [33.886917, 9.537499],
    "Croatian": [45.1, 15.2],
    "Egyptian": [26.820553, 30.802498],
    "Greek": [39.074208, 21.824312],
    "Italian": [41.87194, 12.56738],
    "Kenyan": [-0.023559, 37.906193],
    "Moroccan": [31.791702, -7.09262],
    "Portuguese": [39.399872, -8.224454],
    "Spanish": [40.463667, -3.74922],
    "Thai": [15.870032, 100.992541],
    "Vietnamese": [14.058324, 108.277199]
    // ...add more regions as needed
};


  Object.keys(regions).forEach(region => {
      const marker = L.marker(regions[region]).addTo(map);
      marker.on('click', () => {
          updateMealInfo(meals, region);
      });
  });

  
}

function applyFilter() {
    const selectedCategory = document.getElementById('category-select').value;
    const selectedArea = document.getElementById('area-select').value;

    let filteredMeals = globalMealsData;

    if (selectedCategory !== 'all') {
        filteredMeals = filteredMeals.filter(meal => meal.strCategory.toLowerCase() === selectedCategory);
    }

    if (selectedArea !== 'all') {
        filteredMeals = filteredMeals.filter(meal => meal.strArea.toLowerCase() === selectedArea);
    }
    
    displayMealsAsImages(filteredMeals);
}

function displayMealsAsImages(meals) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = ''; // Clear existing images

    meals.forEach(meal => {
        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;
        img.onclick = () => showMealDetails(meal.idMeal);
        gallery.appendChild(img);
    });
}

function updateMealInfo(meals, region) {
  const countryHeading = `<h2 class="country-name">${region}</h2>`;
  // Create an image gallery for the meals
  const galleryHtml = meals.filter(meal => meal.strArea === region).map(meal => {
      return `<img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="showMealDetails('${meal.idMeal}')">`;
  }).join('');

  document.getElementById("image-gallery").innerHTML = countryHeading + galleryHtml;
}

function showMealDetails(mealId) {
    const meal = globalMealsData.find(meal => meal.idMeal === mealId);
    if(meal) {
      // Build a list of ingredients and measures
      let ingredientsList = '<ul>';
      for (let i = 1; i <= 20; i++) { // Adjust the number accordingly
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && measure) {
              ingredientsList += `<li>${measure} of ${ingredient}</li>`;
          }
      }
      ingredientsList += '</ul>';

      // Create the HTML for the modal content
      const instructionsSteps = meal.strInstructions.split(/\.|\r\n/).filter(step => step.trim().length > 0);
      let instructionsList = '<ol>';
      instructionsSteps.forEach((step, index) => {
          // Add the step number and text to the list
          instructionsList += `<li>${step.trim()}.</li>`;
      });
      instructionsList += '</ol>';

        // Adding region and YouTube video link
        const region = meal.strArea ? `<p>Region: ${meal.strArea}</p>` : '';
        const youtubeLink = meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>` : '';

        // Create the HTML for the modal content
        const detailsHtml = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="modal-img">
            ${region} <!-- Display region -->
            ${youtubeLink} <!-- YouTube link -->
            <h4>Ingredients:</h4>
            ${ingredientsList}
            <h4>Instructions:</h4>
            ${instructionsList}
        `;

      // Update the modal with the new HTML and show it
      document.getElementById("meal-details-content").innerHTML = detailsHtml;
      document.getElementById("details-modal").style.display = "block";
  }
}



// Event listener for closing the modal
document.querySelector('.close-button').addEventListener('click', function() {
document.getElementById("details-modal").style.display = "none";
});



let globalMealsData = []; // Holds your meals data
let ingredientSet = new Set(); // Set to track added ingredients
let globalNodes = new Set();
let globalLinks = [];
let simulation;
let allIngredients = []; // Array to store all ingredients

document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            globalMealsData = data.meals;
            initMap(globalMealsData);
            populateIngredientSet(globalMealsData); // Populate ingredient set
            createIngredientNetwork(globalMealsData);

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
    document.getElementById('apply-network-filter-btn').addEventListener('click', applyNetworkFilter);
    // Add event listeners for other filters
    document.getElementById('network-visualization-btn').addEventListener('click', function() {
    document.getElementById('ingredient-network-modal').style.display = 'block';
    createIngredientNetwork(globalMealsData); // Create network when modal opens
});

document.querySelector('#ingredient-network-modal .close-button').addEventListener('click', function() {
    document.getElementById('ingredient-network-modal').style.display = 'none';
});

document.getElementById('details-modal').querySelector('.close-button').addEventListener('click', function() {
    document.getElementById("details-modal").style.display = "none";
});

createIngredientNetwork();
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

function applyNetworkFilter() {
    const selectedIngredient = document.getElementById('ingredient-select').value.toLowerCase();
    filterByIngredient(selectedIngredient);
}

function filterByIngredient(ingredient) {
    // Convert ingredient to lowercase for consistent comparison
    ingredient = ingredient.toLowerCase();

    let filteredNodes = [];
    let filteredLinks = [];

    if (ingredient === 'all') {
        // If 'all' is selected, use the global dataset
        filteredNodes = Array.from(globalNodes);
        filteredLinks = Array.from(globalLinks);
    } else {
        // Filter nodes that are either the selected ingredient or are meals containing that ingredient
        globalNodes.forEach(node => {
            if (node.group === 'Ingredient' && node.id === ingredient) {
                filteredNodes.push(node);
            } else if (node.group === 'Meal') {
                let containsIngredient = globalLinks.some(link => (link.target.id === ingredient && link.source.id === node.id));
                if (containsIngredient) {
                    filteredNodes.push(node);
                }
            }
        });

        // Filter links to include only those that connect to the selected ingredient
        globalLinks.forEach(link => {
            if (link.target.id === ingredient || link.source.id === ingredient) {
                filteredLinks.push(link);
            }
        });
    }

    // Create the network with the filtered nodes and links
    createNetwork(filteredNodes, filteredLinks);
}


function populateIngredientSet(mealsData) {
    ingredientSet.clear(); // Clear existing set

    mealsData.forEach(meal => {
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredientSet.add(ingredient.toLowerCase());
            }
        }
    });

    populateIngredientDropdown(ingredientSet); // Populate dropdown after set is ready
}

function populateIngredientDropdown(ingredientSet) {
    const ingredientSelect = document.getElementById('ingredient-select');
    ingredientSelect.innerHTML = '<option value="all">All Ingredients</option>';

    // Convert set to array, capitalize and sort
    const sortedIngredients = Array.from(ingredientSet)
                                   .map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1))
                                   .sort();

    sortedIngredients.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient.toLowerCase();
        option.textContent = ingredient;
        ingredientSelect.appendChild(option);
    });
}

function createIngredientNetwork(mealsData) {
    globalNodes = [];
    globalLinks = [];

    mealsData.forEach(meal => {
        let mealNode = { id: meal.idMeal, group: 'Meal', label: meal.strMeal };
        globalNodes.push(mealNode);
    
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                let ingredientNode = { id: ingredient.toLowerCase(), group: 'Ingredient', label: ingredient };
                if (!globalNodes.some(node => node.id === ingredientNode.id)) {
                    globalNodes.push(ingredientNode);
                }
                globalLinks.push({ source: meal.idMeal, target: ingredient.toLowerCase() });
            }
        }
    });

    createNetwork(globalNodes, globalLinks);
}

function createNetwork(nodes, links) {
    d3.select('#network-visualization').selectAll("*").remove();

    const modalContent = document.querySelector('#ingredient-network-modal .modal-content');
    const width = modalContent.clientWidth;
    const height = modalContent.clientHeight;

    const svg = d3.select('#network-visualization').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g');

    const zoomHandler = d3.zoom()
        .on('zoom', (event) => svg.attr('transform', event.transform));
    svg.call(zoomHandler);

    simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

    let link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 2)
        .attr('stroke', '#999');

    let node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 5)
        .attr('fill', colorByGroup)
        .call(drag(simulation))
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
        .on('click', clickNode);

    node.append('title')
        .text(d => d.label);

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });

    function mouseOver(event, d) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'block';
        tooltip.style.left = (event.pageX + 10) + 'px';
        tooltip.style.top = (event.pageY + 10) + 'px';
        tooltip.innerHTML = `${d.label}`;
    }
    
    function mouseOut(event, d) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }
    
    function clickNode(event, d) {
        const infoPanel = document.getElementById('info-panel');
        infoPanel.innerHTML = `<h3>Details</h3><p>Label: ${d.label}</p><p>Type: ${d.group}</p>`;
    }
    
}

function colorByGroup(d) {
    return d.group === 'Ingredient' ? 'green' : 'red';
}

function drag(simulation) {
    function dragStarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragEnded(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded);
}

// Event listener for closing the modal
document.querySelector('.close-button').addEventListener('click', function() {
document.getElementById("details-modal").style.display = "none";

});

document.getElementById('ingredient-filter').addEventListener('change', function(event) {
    // Filter by the selected ingredient
    filterByIngredient(event.target.value);
});

document.getElementById('apply-network-filter-btn').addEventListener('click', function() {
    const selectedIngredient = document.getElementById('ingredient-select').value;
    filterByIngredient(selectedIngredient);
});



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('apply-network-filter-btn').addEventListener('click', applyNetworkFilter);
});
// Call the function with your data
createIngredientNetwork(globalMealsData);
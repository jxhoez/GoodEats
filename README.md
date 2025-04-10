# Good Eats: A World Cuisine Map 🌍🍽️

An interactive web application that helps users explore and discover cuisines from around the world. This project visualizes global culinary traditions and helps users find restaurants and dishes from different cultures. Built with modern web technologies, it offers an engaging way to explore international cuisine through an interactive map interface and ingredient network visualization.

![Good Eats Screenshot](screenshot.png)

## ✨ Features

### 🗺️ Interactive Map
- Explore cuisines from different regions around the world
- Click on locations to discover local dishes and ingredients
- Filter by categories and areas for targeted exploration
- Responsive map interface with smooth interactions

### 🔍 Ingredient Network
- Visualize relationships between different ingredients
- Discover common ingredients across various cuisines
- Interactive network graph with detailed information on hover
- Filter and explore ingredient connections

### 🎨 User Interface
- Clean, intuitive design with modern aesthetics
- Responsive layout that works on desktop and mobile devices
- Easy-to-use filtering system
- Detailed modal views for comprehensive information
- Smooth animations and transitions

## 🚀 Live Demo

The application is deployed at: [Good Eats](https://jxhoez.github.io/GoodEats/)

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling and animations
- **JavaScript (ES6+)** - Core functionality and interactivity
- **Leaflet.js** (v1.7.1) - Interactive map visualization
- **D3.js** (v7) - Data visualization and network graphs

### Development & Deployment
- **GitLab Pages** - Static site hosting
- **GitLab CI/CD** - Continuous deployment
- **Alpine Linux** - Deployment environment

## 🏗️ Project Structure

```
GoodEats/
├── public/          # Static files and deployment assets
│   ├── index.html  # Main HTML file
│   ├── style.css   # Stylesheet
│   ├── main.js     # Main JavaScript code
│   └── data.json   # Dataset
└── .gitlab-ci.yml  # GitLab CI configuration
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of web development (for contributing)
- Node.js (optional, for development)

### Installation

1. Clone the repository
```bash
git clone https://github.com/jxhoez/GoodEats.git
```

2. Navigate to the project directory
```bash
cd GoodEats
```

3. Start a local server
```bash
# Using Python's built-in HTTP server
python -m http.server 8000

# Or using Node.js
npx serve public

# Or using any other local server of your choice
```

4. Open your browser and visit `http://localhost:8000`

## 💻 Development

### Key Components

- **Map Visualization**: Implemented using Leaflet.js for interactive geographic exploration
- **Network Graph**: Built with D3.js for ingredient relationship visualization
- **Data Management**: JSON-based data structure for efficient data handling
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Code Organization

- **main.js**: Core application logic and data handling
- **style.css**: Comprehensive styling with modern CSS features
- **data.json**: Structured dataset of global cuisines and ingredients

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

- **Johny Ho** - *Initial work* - [GitHub Profile](https://github.com/jxhoez)

## 🙏 Acknowledgments

- Leaflet.js and D3.js communities for their excellent documentation and tools
- Open source community for inspiration and resources
- Contributors and users for their valuable feedback

## 📞 Contact

Feel free to reach out if you have any questions or suggestions!

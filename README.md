# 🏪 Price Tracker Tool

A comprehensive web application designed for retail shopkeepers to track, compare, and analyze supplier prices to make smarter purchasing decisions.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Price Tracker Tool addresses a common challenge faced by retail shopkeepers in informal markets: rapidly changing supplier prices. This application provides a simple, intuitive interface to track multiple suppliers, manage product catalogs, record price information, and perform real-time price comparisons.

### Problem Solved
- **Challenge**: Shopkeepers struggle with fluctuating supplier prices and lack tools to compare options effectively
- **Solution**: A centralized platform to track all supplier prices and get instant comparisons to make informed purchasing decisions

## ✨ Features

### 📊 Dashboard
- Real-time statistics overview
- Total suppliers, products, and price entries
- Recent activity tracking
- Clean, professional interface

### 👥 Supplier Management
- Add unlimited suppliers
- Store contact information and locations
- Track supplier history
- Easy supplier selection for price entries

### 📦 Product Management
- Comprehensive product catalog
- Categorize products for better organization
- Support for different units (pieces, kg, liters, etc.)
- Quick product lookup

### 💰 Price Tracking
- Record prices from multiple suppliers
- Add notes and context to price entries
- Automatic timestamp tracking
- View recent price history

### 🔍 Price Comparison
- Instant price comparison across all suppliers
- Automatic sorting from lowest to highest price
- Visual highlighting of best prices
- Date-based price analysis

### 📱 Additional Features
- **Responsive Design**: Works perfectly on mobile devices and tablets
- **Data Persistence**: All data automatically saved in JSON files
- **Real-time Updates**: Instant dashboard updates
- **User-friendly Interface**: Clean, intuitive design
- **No Database Required**: Simple file-based storage

## 🚀 Installation

### Prerequisites
- Python 3.6 or higher
- pip (Python package installer)

### Step-by-Step Setup

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd price_tracker
   ```

2. **Create Project Structure**
   ```bash
   mkdir -p static templates data
   ```

3. **Install Dependencies**
   ```bash
   pip install flask
   ```

4. **Set Up Files**
   - Copy `app.py` to the root directory
   - Copy `style.css` to `static/` folder
   - Copy `script.js` to `static/` folder
   - Copy `index.html` to `templates/` folder

5. **Run the Application**
   ```bash
   python app.py
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:5000`

## 📖 Usage

### Getting Started

1. **Add Your First Supplier**
   - Navigate to the "Suppliers" tab
   - Click "Add Supplier"
   - Fill in supplier name, contact info, and location
   - Click "Add Supplier"

2. **Add Products**
   - Go to the "Products" tab
   - Click "Add Product"
   - Enter product name, category, and unit
   - Click "Add Product"

3. **Record Prices**
   - Switch to the "Add Prices" tab
   - Select a supplier and product
   - Enter the price and any notes
   - Click "Add Price"

4. **Compare Prices**
   - Go to the "Compare Prices" tab
   - Select a product from the dropdown
   - View instant price comparison across all suppliers

### Best Practices

- **Regular Updates**: Update prices regularly to maintain accuracy
- **Detailed Notes**: Add notes about bulk discounts, quality, or special terms
- **Consistent Units**: Ensure products use consistent units across suppliers
- **Supplier Info**: Keep supplier contact information up to date

## 📁 Project Structure

```
price_tracker/
├── app.py                 # Main Flask application
├── static/
│   ├── style.css         # CSS styling and responsive design
│   └── script.js         # Frontend JavaScript functionality
├── templates/
│   └── index.html        # Main HTML template
├── data/                 # Auto-created data storage
│   ├── suppliers.json    # Supplier information
│   ├── products.json     # Product catalog
│   └── price_history.json # Price tracking data
└── README.md             # Project documentation
```

### File Descriptions

- **app.py**: Flask backend with API endpoints and data management
- **style.css**: Responsive CSS with modern design and mobile support
- **script.js**: Frontend logic for user interactions and API calls
- **index.html**: Single-page application template with all UI components
- **data/**: JSON files for persistent data storage (auto-created)

## 🔌 API Endpoints

### Suppliers
- `GET /api/suppliers` - Retrieve all suppliers
- `POST /api/suppliers` - Add a new supplier

### Products
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add a new product

### Prices
- `GET /api/prices` - Retrieve all price entries
- `POST /api/prices` - Add a new price entry
- `GET /api/price-comparison/<product_id>` - Get price comparison for a product

### Dashboard
- `GET /api/dashboard-stats` - Get dashboard statistics

### Example API Usage

```javascript
// Add a new supplier
fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'ABC Wholesale',
        contact: '+1234567890',
        location: 'Downtown Market'
    })
});

// Get price comparison
fetch('/api/price-comparison/1')
    .then(response => response.json())
    .then(data => console.log(data));
```

## 🛠 Technologies Used

### Backend
- **Flask**: Lightweight Python web framework
- **Python 3.6+**: Core programming language
- **JSON**: Data storage format

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: No external dependencies
- **Responsive Design**: Mobile-first approach

### Key Libraries
- **Flask**: Web framework and API development
- **JSON**: Built-in Python module for data persistence
- **Datetime**: Python module for timestamp management

## 🎨 Design Features

- **Modern UI**: Clean, professional interface
- **Mobile Responsive**: Optimized for all screen sizes
- **Interactive Elements**: Smooth animations and hover effects
- **Color Scheme**: Professional blue gradient theme
- **Accessibility**: Proper contrast and semantic markup
- **Loading States**: Visual feedback for user actions

## 🔧 Customization

### Adding New Features
1. **Backend**: Add new routes in `app.py`
2. **Frontend**: Extend JavaScript functions in `script.js`
3. **Styling**: Modify CSS in `style.css`
4. **UI**: Update HTML structure in `index.html`

### Configuration Options
- **Port**: Change port in `app.py` (default: 5000)
- **Host**: Modify host setting for network access
- **Data Directory**: Update data file paths in `app.py`

## 🚧 Future Enhancements

- **Database Integration**: PostgreSQL or MySQL support
- **User Authentication**: Multi-user support with login
- **Export Features**: CSV/Excel export functionality
- **Analytics**: Advanced reporting and trend analysis
- **Mobile App**: Native mobile application
- **Barcode Scanner**: Product identification via barcode
- **Inventory Integration**: Stock level tracking
- **Automated Alerts**: Price change notifications

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use semantic commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) section
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- Built for retail shopkeepers in informal markets
- Inspired by real-world challenges in price management
- Designed with simplicity and usability in mind

---

**Made with ❤️ for retail shopkeepers worldwide**

*Happy tracking! 🛒📊*

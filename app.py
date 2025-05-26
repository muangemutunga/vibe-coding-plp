from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
import os

app = Flask(__name__)

# In-memory storage (replace with database in production)
suppliers = []
products = []
price_history = []

# Data file paths
DATA_DIR = 'data'
SUPPLIERS_FILE = os.path.join(DATA_DIR, 'suppliers.json')
PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.json')
PRICE_HISTORY_FILE = os.path.join(DATA_DIR, 'price_history.json')

def ensure_data_dir():
    """Create data directory if it doesn't exist"""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)

def load_data():
    """Load data from JSON files"""
    global suppliers, products, price_history
    
    ensure_data_dir()
    
    try:
        if os.path.exists(SUPPLIERS_FILE):
            with open(SUPPLIERS_FILE, 'r') as f:
                suppliers = json.load(f)
    except:
        suppliers = []
    
    try:
        if os.path.exists(PRODUCTS_FILE):
            with open(PRODUCTS_FILE, 'r') as f:
                products = json.load(f)
    except:
        products = []
    
    try:
        if os.path.exists(PRICE_HISTORY_FILE):
            with open(PRICE_HISTORY_FILE, 'r') as f:
                price_history = json.load(f)
    except:
        price_history = []

def save_data():
    """Save data to JSON files"""
    ensure_data_dir()
    
    with open(SUPPLIERS_FILE, 'w') as f:
        json.dump(suppliers, f, indent=2)
    
    with open(PRODUCTS_FILE, 'w') as f:
        json.dump(products, f, indent=2)
    
    with open(PRICE_HISTORY_FILE, 'w') as f:
        json.dump(price_history, f, indent=2)

@app.route('/')
def index():
    """Main page"""
    return render_template('index.html')

@app.route('/api/suppliers', methods=['GET', 'POST'])
def handle_suppliers():
    """Handle supplier operations"""
    if request.method == 'POST':
        data = request.json
        supplier = {
            'id': len(suppliers) + 1,
            'name': data['name'],
            'contact': data.get('contact', ''),
            'location': data.get('location', ''),
            'created_at': datetime.now().isoformat()
        }
        suppliers.append(supplier)
        save_data()
        return jsonify(supplier)
    
    return jsonify(suppliers)

@app.route('/api/products', methods=['GET', 'POST'])
def handle_products():
    """Handle product operations"""
    if request.method == 'POST':
        data = request.json
        product = {
            'id': len(products) + 1,
            'name': data['name'],
            'category': data.get('category', ''),
            'unit': data.get('unit', 'piece'),
            'created_at': datetime.now().isoformat()
        }
        products.append(product)
        save_data()
        return jsonify(product)
    
    return jsonify(products)

@app.route('/api/prices', methods=['GET', 'POST'])
def handle_prices():
    """Handle price operations"""
    if request.method == 'POST':
        data = request.json
        price_entry = {
            'id': len(price_history) + 1,
            'supplier_id': data['supplier_id'],
            'product_id': data['product_id'],
            'price': float(data['price']),
            'date': datetime.now().isoformat(),
            'notes': data.get('notes', '')
        }
        price_history.append(price_entry)
        save_data()
        return jsonify(price_entry)
    
    return jsonify(price_history)

@app.route('/api/price-comparison/<int:product_id>')
def price_comparison(product_id):
    """Get price comparison for a specific product"""
    product_prices = [p for p in price_history if p['product_id'] == product_id]
    
    # Group by supplier and get latest price
    supplier_prices = {}
    for price in product_prices:
        supplier_id = price['supplier_id']
        if supplier_id not in supplier_prices or price['date'] > supplier_prices[supplier_id]['date']:
            supplier_prices[supplier_id] = price
    
    # Add supplier names
    result = []
    for supplier_id, price_data in supplier_prices.items():
        supplier = next((s for s in suppliers if s['id'] == supplier_id), None)
        if supplier:
            result.append({
                **price_data,
                'supplier_name': supplier['name']
            })
    
    # Sort by price
    result.sort(key=lambda x: x['price'])
    
    return jsonify(result)

@app.route('/api/dashboard-stats')
def dashboard_stats():
    """Get dashboard statistics"""
    stats = {
        'total_suppliers': len(suppliers),
        'total_products': len(products),
        'total_price_entries': len(price_history),
        'recent_updates': len([p for p in price_history if (datetime.now() - datetime.fromisoformat(p['date'])).days <= 7])
    }
    return jsonify(stats)

if __name__ == '__main__':
    load_data()
    app.run(debug=True, host='0.0.0.0', port=5000)
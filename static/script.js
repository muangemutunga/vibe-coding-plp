// Global variables
let suppliers = [];
let products = [];
let priceHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadSuppliers();
    loadProducts();
    loadPrices();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Supplier form
    document.getElementById('supplier-form-element').addEventListener('submit', handleSupplierSubmit);
    
    // Product form
    document.getElementById('product-form-element').addEventListener('submit', handleProductSubmit);
    
    // Price form
    document.getElementById('price-form-element').addEventListener('submit', handlePriceSubmit);
    
    // Compare product selector
    document.getElementById('compare-product').addEventListener('change', handleCompareProductChange);
}

// Tab management
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    // Load data for specific tabs
    if (tabName === 'prices') {
        populatePriceFormSelectors();
    } else if (tabName === 'compare') {
        populateCompareSelector();
    }
}

// Dashboard functions
async function loadDashboardStats() {
    try {
        const response = await fetch('/api/dashboard-stats');
        const stats = await response.json();
        
        document.getElementById('total-suppliers').textContent = stats.total_suppliers;
        document.getElementById('total-products').textContent = stats.total_products;
        document.getElementById('total-prices').textContent = stats.total_price_entries;
        document.getElementById('recent-updates').textContent = stats.recent_updates;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Supplier management
async function loadSuppliers() {
    try {
        const response = await fetch('/api/suppliers');
        suppliers = await response.json();
        displaySuppliers();
    } catch (error) {
        console.error('Error loading suppliers:', error);
        showMessage('Error loading suppliers', 'error');
    }
}

function displaySuppliers() {
    const container = document.getElementById('suppliers-list');
    
    if (suppliers.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No suppliers added yet</h3><p>Add your first supplier to get started</p></div>';
        return;
    }
    
    container.innerHTML = suppliers.map(supplier => `
        <div class="data-item">
            <h4>${supplier.name}</h4>
            <p><strong>Contact:</strong> ${supplier.contact || 'Not provided'}</p>
            <p><strong>Location:</strong> ${supplier.location || 'Not provided'}</p>
            <small>Added: ${formatDate(supplier.created_at)}</small>
        </div>
    `).join('');
}

function showAddSupplierForm() {
    document.getElementById('supplier-form').style.display = 'block';
    document.getElementById('supplier-name').focus();
}

function hideAddSupplierForm() {
    document.getElementById('supplier-form').style.display = 'none';
    document.getElementById('supplier-form-element').reset();
}

async function handleSupplierSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('supplier-name').value,
        contact: document.getElementById('supplier-contact').value,
        location: document.getElementById('supplier-location').value
    };
    
    try {
        const response = await fetch('/api/suppliers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage('Supplier added successfully!', 'success');
            hideAddSupplierForm();
            loadSuppliers();
            loadDashboardStats();
        } else {
            throw new Error('Failed to add supplier');
        }
    } catch (error) {
        console.error('Error adding supplier:', error);
        showMessage('Error adding supplier', 'error');
    }
}

// Product management
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('Error loading products', 'error');
    }
}

function displayProducts() {
    const container = document.getElementById('products-list');
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>No products added yet</h3><p>Add your first product to get started</p></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="data-item">
            <h4>${product.name}</h4>
            <p><strong>Category:</strong> ${product.category || 'Not specified'}</p>
            <p><strong>Unit:</strong> ${product.unit}</p>
            <small>Added: ${formatDate(product.created_at)}</small>
        </div>
    `).join('');
}

function showAddProductForm() {
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('product-name').focus();
}

function hideAddProductForm() {
    document.getElementById('product-form').style.display = 'none';
    document.getElementById('product-form-element').reset();
}

async function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        unit: document.getElementById('product-unit').value
    };
    
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage('Product added successfully!', 'success');
            hideAddProductForm();
            loadProducts();
            loadDashboardStats();
        } else {
            throw new Error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        showMessage('Error adding product', 'error');
    }
}

// Price management
async function loadPrices() {
    try {
        const response = await fetch('/api/prices');
        priceHistory = await response.json();
        displayRecentPrices();
    } catch (error) {
        console.error('Error loading prices:', error);
        showMessage('Error loading prices', 'error');
    }
}

function displayRecentPrices() {
    const container = document.getElementById('recent-prices');
    
    if (priceHistory.length === 0) {
        container.innerHTML = '<h3>Recent Price Entries</h3><div class="empty-state"><p>No price entries yet</p></div>';
        return;
    }
    
    // Sort by date (most recent first) and take last 10
    const recentPrices = priceHistory
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    const pricesHtml = recentPrices.map(price => {
        const supplier = suppliers.find(s => s.id === price.supplier_id);
        const product = products.find(p => p.id === price.product_id);
        
        return `
            <div class="data-item">
                <h4>${product ? product.name : 'Unknown Product'} - ${price.price}</h4>
                <p><strong>Supplier:</strong> ${supplier ? supplier.name : 'Unknown Supplier'}</p>
                <p><strong>Notes:</strong> ${price.notes || 'No notes'}</p>
                <small>Added: ${formatDate(price.date)}</small>
            </div>
        `;
    }).join('');
    
    container.innerHTML = '<h3>Recent Price Entries</h3>' + pricesHtml;
}

function populatePriceFormSelectors() {
    // Populate suppliers dropdown
    const supplierSelect = document.getElementById('price-supplier');
    supplierSelect.innerHTML = '<option value="">Select a supplier</option>' +
        suppliers.map(supplier => `<option value="${supplier.id}">${supplier.name}</option>`).join('');
    
    // Populate products dropdown
    const productSelect = document.getElementById('price-product');
    productSelect.innerHTML = '<option value="">Select a product</option>' +
        products.map(product => `<option value="${product.id}">${product.name}</option>`).join('');
}

async function handlePriceSubmit(e) {
    e.preventDefault();
    
    const formData = {
        supplier_id: parseInt(document.getElementById('price-supplier').value),
        product_id: parseInt(document.getElementById('price-product').value),
        price: parseFloat(document.getElementById('price-amount').value),
        notes: document.getElementById('price-notes').value
    };
    
    try {
        const response = await fetch('/api/prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage('Price added successfully!', 'success');
            clearPriceForm();
            loadPrices();
            loadDashboardStats();
        } else {
            throw new Error('Failed to add price');
        }
    } catch (error) {
        console.error('Error adding price:', error);
        showMessage('Error adding price', 'error');
    }
}

function clearPriceForm() {
    document.getElementById('price-form-element').reset();
}

// Price comparison
function populateCompareSelector() {
    const compareSelect = document.getElementById('compare-product');
    compareSelect.innerHTML = '<option value="">Choose a product</option>' +
        products.map(product => `<option value="${product.id}">${product.name}</option>`).join('');
}

async function handleCompareProductChange(e) {
    const productId = e.target.value;
    const resultsContainer = document.getElementById('price-comparison-results');
    
    if (!productId) {
        resultsContainer.innerHTML = '';
        return;
    }
    
    resultsContainer.innerHTML = '<div class="loading">Loading price comparison...</div>';
    
    try {
        const response = await fetch(`/api/price-comparison/${productId}`);
        const comparison = await response.json();
        
        displayPriceComparison(comparison, productId);
    } catch (error) {
        console.error('Error loading price comparison:', error);
        resultsContainer.innerHTML = '<div class="empty-state"><h3>Error loading comparison</h3></div>';
    }
}

function displayPriceComparison(comparison, productId) {
    const resultsContainer = document.getElementById('price-comparison-results');
    const product = products.find(p => p.id === parseInt(productId));
    
    if (comparison.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No prices found</h3>
                <p>No price data available for ${product ? product.name : 'this product'}</p>
            </div>
        `;
        return;
    }
    
    const comparisonHtml = comparison.map((item, index) => {
        const isBestPrice = index === 0; // First item is cheapest
        return `
            <div class="price-comparison-item ${isBestPrice ? 'best-price' : ''}">
                <div class="supplier-info">
                    <h4>${item.supplier_name} ${isBestPrice ? '🥇 Best Price' : ''}</h4>
                    <p>${item.notes || 'No additional notes'}</p>
                </div>
                <div class="price-info">
                    <div class="price-amount">${item.price.toFixed(2)}</div>
                    <div class="price-date">${formatDate(item.date)}</div>
                </div>
            </div>
        `;
    }).join('');
    
    resultsContainer.innerHTML = `
        <h3>Price Comparison for ${product ? product.name : 'Selected Product'}</h3>
        <p style="margin-bottom: 20px; color: #666;">Prices sorted from lowest to highest</p>
        ${comparisonHtml}
    `;
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showMessage(message, type = 'success') {
    const container = document.getElementById('message-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    container.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Helper function to get supplier name by ID
function getSupplierName(id) {
    const supplier = suppliers.find(s => s.id === id);
    return supplier ? supplier.name : 'Unknown Supplier';
}

// Helper function to get product name by ID
function getProductName(id) {
    const product = products.find(p => p.id === id);
    return product ? product.name : 'Unknown Product';
}
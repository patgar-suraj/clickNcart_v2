import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let productsData = [];

// Load products from db.json on startup
const loadProducts = () => {
  try {
    // db.json is one level up from controllers folder, which is one level up from backend root
    const dbPath = path.resolve(__dirname, '..', '..', 'backend', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const dbData = JSON.parse(rawData);
    productsData = dbData.products || [];
    console.log(`Loaded ${productsData.length} products from db.json`);
  } catch (error) {
    console.error('Error loading products from', dbPath, ':', error);
    productsData = [];
  }
};

// Load products on module load
loadProducts();

// Get all products with pagination and filtering support
export const getAllProducts = async (req, res) => {
  try {
    let filtered = productsData;

    // Filter by gender if provided
    if (req.query.gender && req.query.gender !== 'all') {
      filtered = filtered.filter(p => p.gender === req.query.gender);
    }

    // Filter by category if provided
    if (req.query.category && req.query.category !== 'all') {
      filtered = filtered.filter(p => p.category === req.query.category);
    }

    // Apply pagination
    const limit = parseInt(req.query._limit) || 10;
    const start = parseInt(req.query._start) || 0;

    const paginatedProducts = filtered.slice(start, start + limit);
    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = productsData.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const newProduct = {
      id: Date.now().toString(),
      ...req.body
    };
    productsData.push(newProduct);
    saveProducts();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const index = productsData.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    productsData[index] = { ...productsData[index], ...req.body };
    saveProducts();
    res.json(productsData[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const index = productsData.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    productsData.splice(index, 1);
    saveProducts();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save products to db.json
const saveProducts = () => {
  try {
    const dbPath = path.resolve(__dirname, '..', '..', 'backend', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const dbData = JSON.parse(rawData);
    dbData.products = productsData;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

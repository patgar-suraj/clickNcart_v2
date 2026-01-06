import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get single product
router.get('/:id', getProductById);

// Create product
router.post('/', createProduct);

// Update product
router.patch('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

export default router;

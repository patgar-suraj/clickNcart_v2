import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// Get all users or filter
router.get('/', getAllUsers);

// Get single user
router.get('/:id', getUserById);

// Create user (register)
router.post('/', createUser);

// Update user
router.patch('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

export default router;

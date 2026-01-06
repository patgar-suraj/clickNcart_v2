import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let usersData = [];

// Load users from db.json on startup
const loadUsers = () => {
  try {
    const dbPath = path.resolve(__dirname, '..', '..', 'backend', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const dbData = JSON.parse(rawData);
    usersData = dbData.users || [];
    console.log(`Loaded ${usersData.length} users from db.json`);
  } catch (error) {
    console.error('Error loading users:', error);
    usersData = [];
  }
};

// Load users on module load
loadUsers();

// Get all users with filter support
export const getAllUsers = async (req, res) => {
  try {
    let filtered = usersData;

    // Filter by email and password (login)
    if (req.query.email && req.query.password) {
      filtered = usersData.filter(
        u => u.email === req.query.email && u.password === req.query.password
      );
    }
    // Filter by email only
    else if (req.query.email) {
      filtered = usersData.filter(u => u.email === req.query.email);
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = usersData.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user (register)
export const createUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = usersData.find(u => u.email === req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = {
      id: Date.now().toString(),
      ...req.body,
      cart: [],
      isAdmin: false
    };
    usersData.push(newUser);
    saveUsers();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const index = usersData.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    usersData[index] = { ...usersData[index], ...req.body };
    saveUsers();
    res.json(usersData[index]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const index = usersData.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    usersData.splice(index, 1);
    saveUsers();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save users to db.json
const saveUsers = () => {
  try {
    const dbPath = path.resolve(__dirname, '..', '..', 'backend', 'db.json');
    const rawData = fs.readFileSync(dbPath, 'utf-8');
    const dbData = JSON.parse(rawData);
    dbData.users = usersData;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

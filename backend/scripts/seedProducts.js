import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Read the db.json file
    const dbPath = path.join(__dirname, '../db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    
    // Check if products already exist
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log('Database already contains products. Clearing...');
      await Product.deleteMany({});
    }

    // Insert products
    const result = await Product.insertMany(dbData.products);
    console.log(`✓ Successfully seeded ${result.length} products into MongoDB`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

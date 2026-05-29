import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from '../src/server.js';
import { connectDatabase } from '../src/lib/database.js';

dotenv.config();

const app = createServer();

// Vercel serverless entry handler
export default async (req, res) => {
  // Ensure database is connected before handling requests
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDatabase();
    } catch (err) {
      console.error('Failed to establish database connection during serverless boot:', err);
      return res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
  }

  // Forward request execution to standard Express routes
  return app(req, res);
};

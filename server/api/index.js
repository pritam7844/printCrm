import dotenv from 'dotenv';
import { createServer } from '../src/server.js';
import { connectDatabase } from '../src/lib/database.js';

dotenv.config();

let dbConnected = false;
const app = createServer();

// Vercel serverless entry handler
export default async (req, res) => {
  // Ensure database is connected before handling requests
  if (!dbConnected) {
    try {
      await connectDatabase();
      dbConnected = true;
    } catch (err) {
      console.error('Failed to establish database connection during serverless boot:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  // Forward request execution to standard Express routes
  return app(req, res);
};

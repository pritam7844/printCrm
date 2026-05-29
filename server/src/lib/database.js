import mongoose from 'mongoose';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/printcrm';

  mongoose.set('strictQuery', true);
  
  // Disable query buffering to fail fast if connection drops, allowing auto-recovery on retry
  mongoose.set('bufferCommands', false);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s if unable to reach database
  });
  
  console.log('MongoDB connected');
  return mongoose.connection;
};

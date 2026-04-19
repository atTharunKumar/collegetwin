import mongoose from 'mongoose';

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export async function connectDB() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export function disconnectDB() {
  return mongoose.disconnect();
}

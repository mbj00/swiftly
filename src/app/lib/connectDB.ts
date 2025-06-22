import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export default async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'swiftlyDB',
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

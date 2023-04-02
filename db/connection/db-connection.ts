import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const connectToDB = async () => {
  const uri: string = process.env.DATABASE_URI;

  mongoose
    .connect(uri, {})
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    });
};

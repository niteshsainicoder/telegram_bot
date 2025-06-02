// bot/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export let weatherApiKey = '';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Access raw MongoDB collection
    const db = mongoose.connection.db;
    const settingsCollection = db.collection('settings');

    const settings = await settingsCollection.findOne({});
    
    if (settings && settings.weatherApiKey) {
      weatherApiKey = settings.weatherApiKey;
      console.log('✅ Weather API Key fetched from DB:', weatherApiKey);
    } else {
      console.warn('⚠️ Weather API Key not found in settings collection');
    }
  } catch (err) {
    console.error('❌ MongoDB error:', err);
  }
};

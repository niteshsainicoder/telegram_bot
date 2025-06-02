import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  weatherApiKey: String,
});

export default mongoose.model('Setting', settingSchema);

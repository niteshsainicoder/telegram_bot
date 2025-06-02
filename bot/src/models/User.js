// bot/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, unique: true },
  subscribed: { type: Boolean, default: false },
  city: { type: String, default: '' },
  blocked: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);

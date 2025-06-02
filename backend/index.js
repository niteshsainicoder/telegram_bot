import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import adminRoutes from './src/routes/admin.js';
import userRoutes from './src/routes/user.js';
import settingRoutes from './src/routes/setting.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB error:', err));

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/settings', settingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from 'express';
import Setting from '../models/Setting.js';
import { verifyAdmin } from '../middelware/auth.js';

const router = express.Router();
router.use(verifyAdmin);

router.get('/', async (req, res) => {
  const settings = await Setting.findOne();
  res.json(settings);
});

router.post('/', async (req, res) => {
  const { weatherApiKey } = req.body;
  let settings = await Setting.findOne();
  if (settings) {
    settings.weatherApiKey = weatherApiKey;
    await settings.save();
  } else {
    settings = await Setting.create({ weatherApiKey });
  }
  res.json(settings);
});

export default router;

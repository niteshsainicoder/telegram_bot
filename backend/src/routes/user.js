import express from 'express';
import User from '../models/User.js';
import { verifyAdmin } from '../middelware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/block/:id', async (req, res) => {
  await User.findByIdAndUpdate({_id:req.params.id}, { blocked: true });
  res.json({ message: 'User blocked' });
});

router.post('/unblock/:id', async (req, res) => {
  await User.findByIdAndUpdate({_id:req.params.id}, { blocked: false });
  res.json({ message: 'User unblocked' });
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete({_id:req.params.id});
  res.json({ message: 'User deleted' });
});

export default router;

import express from 'express';
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid =  bcrypt.compare(password, admin.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if username already exists
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    // generate token
    const token = jwt.sign({ id: newAdmin._id, username }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;

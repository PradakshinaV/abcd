const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) 
    return res.status(400).json({ message: 'All fields are needed' });

  if (await User.findOne({ email })) 
    return res.status(400).json({ message: 'Email already registered' });

  const hash = await bcrypt.hash(password, 12);
  const newUser = new User({ username, email, password: hash });
  await newUser.save();
  res.status(201).json({ message: 'Registered successfully!' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'All fields are needed' });

  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, username: user.username });
});

module.exports = router;

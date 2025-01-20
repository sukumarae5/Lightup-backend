const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  const { name, email, password, phone_number, role } = req.body;

  if (!name || !email || !password || !phone_number || !role) {
    return res.status(400).json({ error: 'All fields (name, email, password, phone_number, role) are required.' });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  const phoneNumberRegex = /^\d{10}$/;
  const validRoles = ['customer', 'admin'];

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 5 characters long.',
    });
  }

  if (!phoneNumberRegex.test(phone_number)) {
    return res.status(400).json({ error: 'Phone number must contain exactly 10 digits.' });
  }

  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: 'Role must be either "customer" or "admin".' });
  }

  try {
    const userId = await userService.registerUser({ name, email, password, phone_number, role });
    res.status(201).json({ message: 'User registered successfully.', userId });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Duplicate entry', message: 'The email or phone number already exists.' });
    }
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  if (!email && !username) {
    return res.status(400).json({ message: 'Either email or username is required.' });
  }

  try {
    const user = await userService.loginUser(email, username, password);
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    res.status(200).json({ message: 'Login successful', user: user[0] });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Server error.' });
  }
};

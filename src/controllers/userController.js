const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/emailServices");

exports.registerUser = async (req, res) => {
  const { name, email, password, phone_number, role } = req.body;

  if (!name || !email || !password || !phone_number || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Register user in the database
    const userId = await userService.registerUser({ name, email, password, phone_number, role });

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const subject = "Welcome to Our E-commerce Platform!";
    const html = `<p>Hi ${name},</p>
                  <p>Thank you for registering. Your role is: <strong>${role}</strong>.</p>
                  <p>Enjoy shopping with us!</p>`;

    // Send welcome email
    await sendEmail(
      email,
      subject, 
      html
    );

    res.status(201).json({
      message: "User registered successfully.",
      userId,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// 📌 User Login
exports.loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    return res.status(400).json({ message: "Either email or username is required." });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required." });
  }

  try {
    const user = await userService.loginUser(email, username, password);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// 📌 Get All Users (Protected)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// 📌 Update User
exports.updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { name, email, password, phone_number, role } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const result = await userService.updateUser(userId, { name, email, password, phone_number, role });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found or no changes made." });
    }

    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// 📌 Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUser(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// In userController.js

// 📌 Get User by ID (Protected)
exports.getUserById = async (req, res) => {
  const { id: userId } = req.params; // Get the userId from the URL params

  try {
    const user = await userService.fetchUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user data (excluding sensitive information like password)
    const { password, ...userProfile } = user; // Remove the password from the response

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Server error." });
  }
};

const express = require("express");
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById } = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all",  getAllUsers);
router.put("/update/:id", authenticateToken, updateUser);
router.delete("/delete/:id", authenticateToken, deleteUser);
// In userRoutes.js

router.get("/profile/:id", authenticateToken, getUserById); // Protected route to get user by ID



module.exports = router;

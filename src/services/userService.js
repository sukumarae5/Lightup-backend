const userModel = require("../models/User");

const registerUser = async (userData) => {
  return await userModel.createUser(userData);
};

const loginUser = async (email, username, password) => {
  return await userModel.findUserByEmailOrUsername(email, username, password);
};

const fetchAllUsers = async () => {
  return await userModel.getAllUsers();
};

const fetchUserById = async (userId) => {
  return await userModel.getUserById(userId);
};

const updateUser = async (userId, userData) => {
  return await userModel.updateUser(userId, userData);
};

const deleteUser = async (userId) => {
  return await userModel.deleteUser(userId);
};

module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
};

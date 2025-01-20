const userModel = require('../models/User');

const registerUser = async (userData) => {
  return await userModel.createUser(userData);
};

const loginUser = async (email, username, password) => {
  return await userModel.findUserByEmailOrUsername(email, username, password);
};

const fetchAllUsers = async () => {
  return await userModel.getAllUsers();
};

module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers,
};

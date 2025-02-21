const db = require("../config/db");

const createUser = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password, phone_number, role)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [userData.name, userData.email, userData.password, userData.phone_number, userData.role];

  const [results] = await db.execute(query, values);
  return results.insertId;
};

const findUserByEmailOrUsername = async (email, username, password) => {
  let query;
  let values;

  if (email) {
    query = "SELECT * FROM users WHERE email = ? AND password = ?";
    values = [email, password];
  } else {
    query = "SELECT * FROM users WHERE username = ? AND password = ?";
    values = [username, password];
  }

  const [results] = await db.execute(query, values);
  return results;
};

const getAllUsers = async () => {
  const [results] = await db.execute("SELECT * FROM users");
  return results;
};

const getUserById = async (userId) => {
  console.log("Fetching user with ID:", userId);
  const query = "SELECT * FROM users WHERE id = ?";
  const [results] = await db.execute(query, [userId]);
  return results[0];
};

const updateUser = async (userId, userData) => {
  const query = `
    UPDATE users 
    SET name = ?, email = ?, password = ?, phone_number = ?, role = ?
    WHERE id = ?
  `;
  const values = [userData.name, userData.email, userData.password, userData.phone_number, userData.role, userId];

  const [results] = await db.execute(query, values);
  return results;
};

const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE id = ?";
  const [results] = await db.execute(query, [userId]);
  return results;
};

module.exports = {
  createUser,
  findUserByEmailOrUsername,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

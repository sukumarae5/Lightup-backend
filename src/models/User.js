const connection = require('../config/db');

const createUser = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password, phone_number, role)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [userData.name, userData.email, userData.password, userData.phone_number, userData.role];
  console.log(values)
  const [results] = await connection.execute(query, values);
  return results.insertId;
};

const findUserByEmailOrUsername = async (email, username, password) => {
  const query = email
    ? 'SELECT * FROM users WHERE email = ? AND password = ?'
    : 'SELECT * FROM users WHERE username = ? AND password = ?';
  const values = email ? [email, password] : [username, password];
  const [results] = await connection.execute(query, values);
  return results;
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const [results] = await connection.execute(query);
  return results;
};

module.exports = {
  createUser,
  findUserByEmailOrUsername,
  getAllUsers,
};

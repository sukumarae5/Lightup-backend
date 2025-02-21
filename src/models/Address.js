const db = require("../config/db");

const addAddress = async (addressData) => {
  const { user_id, full_name, phone_number, street_address, city, state, postal_code, country } = addressData;

  // Ensure no undefined values
  const values = [user_id, full_name, phone_number, street_address, city, state, postal_code, country];

  if (values.includes(undefined)) {
    throw new Error("Missing required address fields");
  }

  // Check if it's the first address to set it as default
  const checkDefaultQuery = "SELECT COUNT(*) as count FROM addresses WHERE user_id = ?";
  const [rows] = await db.execute(checkDefaultQuery, [user_id]);
  const isDefault = rows[0].count === 0;

  const query = `
    INSERT INTO addresses (user_id, full_name, phone_number, street_address, city, state, postal_code, country, is_default)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [...values, isDefault]);
  return result.insertId;
};

const getAddressesByUserId = async (userId) => {
  const query = "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC";
  const [rows] = await db.execute(query, [userId]);
  return rows;
};


// Define the updateAddress function
const updateAddress = async (addressId, addressData, userId) => {
  const query = `
      UPDATE addresses
      SET full_name = ?, phone_number = ?, street_address = ?, city = ?,
          state = ?, postal_code = ?, country = ?
      WHERE id = ? AND user_id = ?
  `;

  // Prepare the values for the query
  const values = [
    addressData.full_name ?? null,
    addressData.phone_number ?? null,
    addressData.street_address ?? null,
    addressData.city ?? null,
    addressData.state ?? null,
    addressData.postal_code ?? null,
    addressData.country ?? null,
    addressId,
    userId
  ];

  console.log("Executing SQL Query:", query);
  console.log("With Values:", values);

  // Execute the query and return the result
  const [result] = await db.execute(query, values);
  return result;
};


const deleteAddress = async (addressId) => {
  const query = "DELETE FROM addresses WHERE id = ?";
  const [result] = await db.execute(query, [addressId]);
  return result;
};

const setDefaultAddress = async (userId, addressId) => {
  await db.execute("UPDATE addresses SET is_default = FALSE WHERE user_id = ?", [userId]);
  const query = "UPDATE addresses SET is_default = TRUE WHERE id = ?";
  const [result] = await db.execute(query, [addressId]);
  return result;
};

module.exports = {
  addAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};

const addressModel = require("../models/Address");

const saveAddress = async (addressData) => {
  return await addressModel.addAddress(addressData);
};

const fetchAddressesByUserId = async (userId) => {
  return await addressModel.getAddressesByUserId(userId);
};


const modifyAddress = async (addressId, addressData, userId) => {
  // Now updateAddress is defined and can be called
  return await addressModel.updateAddress(addressId, addressData, userId);
};

const removeAddress = async (addressId) => {
  return await addressModel.deleteAddress(addressId);
};

const setDefaultAddress = async (userId, addressId) => {
  return await addressModel.setDefaultAddress(userId, addressId);
};

module.exports = {
  saveAddress,
  fetchAddressesByUserId,
  modifyAddress,
  removeAddress,
  setDefaultAddress,
};

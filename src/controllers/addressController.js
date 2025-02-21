const addressService = require("../services/addressService");

// 🔒 Add Address (Requires Auth Token)
exports.addAddress = async (req, res) => {
  console.log("Received data:", req.body); // Debugging log

  const { full_name, phone_number, address, city, state, postalcode, country } = req.body;
  const user_id = req.user?.id; // Ensure user_id is extracted correctly
  console.log("User ID:", user_id);

  // Identify missing fields
  const missingFields = [];
  if (!user_id) missingFields.push("user_id");
  if (!full_name) missingFields.push("full_name");
  if (!phone_number) missingFields.push("phone_number");
  if (!address) missingFields.push("address");
  if (!city) missingFields.push("city");
  if (!state) missingFields.push("state");
  if (!postalcode) missingFields.push("postalcode");
  if (!country) missingFields.push("country");

  if (missingFields.length > 0) {
      return res.status(400).json({ 
          success: false, 
          message: "Missing required fields", 
          missingFields 
      });
  }

  const addressData = {
      user_id,
      full_name,
      phone_number,
      street_address: address, // Match DB field
      city,
      state,
      postal_code: postalcode, // Match DB column name
      country
  };

  try {
      const result = await addressService.saveAddress(addressData);
      res.status(201).json({ success: true, message: "Address added successfully", addressId: result });
  } catch (error) {
      console.error("Error saving address:", error);
      res.status(500).json({ success: false, message: "Error saving address" });
  }
};

// 🔒 Get User's Addresses (Only Their Own)
exports.getAddressesByUser = async (req, res) => {
  try {
    const addresses = await addressService.fetchAddressesByUserId(req.user.id);
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🌍 Public: Fetch Addresses by User ID (No Auth Required)
exports.getPublicAddresses = async (req, res) => {
  try {
    const addresses = await addressService.fetchAddressesByUserId(req.params.userId);
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔒 Update Address

exports.updateAddress = async (req, res) => {
  console.log("Received data for update:", req.body); // Debug log

  // Get the address ID from the URL parameters
  const id = req.params.addressId;
  // Destructure the other fields from the request body
  const { full_name, phone_number, address, city, state, postalcode, country } = req.body;
  // Get the user ID from the authenticated request (set by your auth middleware)
  const user_id = req.user?.id;

  console.log("User ID:", user_id);
  console.log("Address ID:", id);

  // Validate required fields
  if (!id || !user_id) {
    return res.status(400).json({ success: false, message: "Address ID and User ID are required" });
  }

  // Map the request data to your DB field names
  const updatedAddressData = {
    full_name: full_name ?? null,
    phone_number: phone_number ?? null,
    street_address: address ?? null, // mapping to DB field
    city: city ?? null,
    state: state ?? null,
    postal_code: postalcode ?? null, // mapping to DB column
    country: country ?? null
  };

  try {
    const result = await addressService.modifyAddress(id, updatedAddressData, user_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Address not found or no changes made" });
    }

    res.status(200).json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ success: false, message: "Error updating address" });
  }
};



// 🔒 Delete Address
exports.deleteAddress = async (req, res) => {
  try {
    await addressService.removeAddress(req.params.addressId);
    res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔒 Set Default Address
exports.setDefaultAddress = async (req, res) => {
  try {
    await addressService.setDefaultAddress(req.user.id, req.params.addressId);
    res.status(200).json({ success: true, message: "Default address updated" });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

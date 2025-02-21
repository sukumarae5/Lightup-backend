const express = require("express");
const addressController = require("../controllers/addressController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔒 Protected APIs (Requires Auth Token)
router.post("/add", verifyToken, addressController.addAddress);
router.get("/get", verifyToken, addressController.getAddressesByUser);
router.put("/update/:addressId", verifyToken, addressController.updateAddress);

router.delete("/delete/:addressId", verifyToken, addressController.deleteAddress);
router.put("/set-default/:addressId", verifyToken, addressController.setDefaultAddress);

// 🌍 Public API (No Auth Required)
router.get("/public/:userId", addressController.getPublicAddresses);

module.exports = router;

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authMiddleware"); // Ensure user authentication

router.get("/my-cart", authenticate, cartController.getCartItems);
router.post("/add", authenticate, cartController.addCartItem);
router.put("/update/:id", authenticate, cartController.updateCartItem);
router.delete("/:id", authenticate, cartController.deleteCartItem);
router.get("/all", cartController.getAllCartItems); // Admin use case

module.exports = router;

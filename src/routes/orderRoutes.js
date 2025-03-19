const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middlewares/authMiddleware');


router.post('/add', authenticate, orderController.createOrder);
router.get('/get', authenticate, orderController.getOrdersByUser);
router.put('/orders', authenticate, orderController.updateOrder);
router.delete('/orders', authenticate, orderController.deleteOrder);
router.get("/getall", orderController.getAllOrders);

module.exports = router;



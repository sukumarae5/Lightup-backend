const express =require('express')
const {registerOrders, getAllOrders}=require('../controllers/orderController')

const router=express.Router();

router.post('/orderregister', registerOrders)
router.get('/allorders', getAllOrders)

module.exports=router;
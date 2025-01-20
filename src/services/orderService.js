const orderModel =require('../models/Order')

const registerOrders = async (orderData)=>{
     return await orderModel.createOrder(orderData)    
}

const fetchAllOrders = async () => {
    return await orderModel.getAllOrders()

}

module.exports={
    registerOrders,
    fetchAllOrders
}
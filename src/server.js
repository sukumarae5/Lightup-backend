const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require("./routes/paymentRoutes");
const addressRoutes=require("./routes/addressRoutes")
const invoiceRoutes=require("./routes/invoice")

const path = require('path'); // Add this line to require the 'path' module



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/api/data', (req, res) => {
  res.json({ message: 'This is your data endpoint.' });
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/address', addressRoutes)
app.use('/api', invoiceRoutes); // Registering the route




const PORT = process.env.PORT || 8081;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port 8081 http://localhost:${PORT}');
});



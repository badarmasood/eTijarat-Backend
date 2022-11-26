const express = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');

const authMiddleWare = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
  app.listen(PORT , () => console.log(`DB Connection Successfull , Server Running at Port ${PORT}`));
})
.catch( err => console.log(err , 'DB Connection Failed'));

app.use(authRoutes);
app.use('/buyer', authMiddleWare , buyerRoutes); 
app.use('/vendor', authMiddleWare , vendorRoutes); 
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use( (err , req , res , next) => {
  res.status(err.status).json({ error: true, message: err.message });
});




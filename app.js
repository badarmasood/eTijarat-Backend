const express = require('express');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
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

const authMiddleWare = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.header('Authorization') || '';
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  const decode = jwt.decode(token, secretKey);
  if (!decode) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  req.user = decode;
  next();
}

app.use(authRoutes);

app.use('/blogs', authMiddleWare , blogRoutes);
app.use('/products',productRoutes);
// app.use('/products',authMiddleWare,productRoutes);

app.use( (err , req , res , next) => {
  res.status(err.status).json({ error: true, message: err.message });
});




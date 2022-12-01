const mongoose = require("mongoose");

const review = mongoose.Schema({
  customerName : {
    type : String
  },
  comment : {
    type : String
  }
});

const productSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
    default : 1,
  },

  imgUrl: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  description : {
    type: String,
    required: true,
    trim: true,
  },

  category : {
    type: String,
    required: true,
  },

  sale_price : {
    type: Number,
    required: true,
  },

  rating : {
    type: Number,
  },

  imgGroup: [
    {
      type: String,
    },
  ],

  reviews: [review],

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },


});

module.exports = mongoose.model('Product', productSchema);















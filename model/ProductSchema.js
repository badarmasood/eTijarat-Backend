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
  
  price: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
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

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },

  reviews: [review],

});

module.exports = mongoose.model('Product', productSchema);















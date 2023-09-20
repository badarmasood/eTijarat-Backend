const mongoose = require("mongoose");

const review = mongoose.Schema({
  customerName: {
    type: String,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const variation = mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  price: {
    type: Number,
  },

  qty: {
    type: Number,
    default: 1,
  },

  imgUrl: {
    type: String,
  },

  stock: {
    type: Number,
    default: 10,
  },

  description: {
    type: String,
    trim: true,
    default:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  category: {
    type: String,
  },

  sale_price: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    default: 1,
  },

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
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
    default: 1,
  },

  imgUrl: {
    type: String,
    // required: true,
  },

  stock: {
    type: Number,
    required: true,
    default: 10,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    default:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  category: {
    type: String,
    required: true,
  },

  sale_price: {
    type: Number,
    required: true,
    default: 0,
  },

  rating: {
    type: Number,
    default: 1,
  },

  variations: [variation],

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

module.exports = mongoose.model("Product", productSchema);

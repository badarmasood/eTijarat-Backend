const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },

  products: [
    {
      type: Object,
    },
  ],

  details: {
    type: Object,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);

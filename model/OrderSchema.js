const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  status:{
    type: String,
  },
  products: [
    {
      type: Object,
    },
  ],
  details: {
  type: Object,
  },
});
module.exports = mongoose.model("Order", orderSchema);
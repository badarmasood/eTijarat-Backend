const mongoose = require("mongoose");


const couponSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    discount : {
        type : Number,
    },
    isEnabled : {
        type : Boolean,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
});

module.exports = mongoose.model("Coupon", couponSchema);

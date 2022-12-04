const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema({
    name: String,
    email: String,
    approvalStatus : {
        type : Boolean,
        default : false,
    },
    documents : { 
        type : String, 
        required: false,
    },
    password: String,
});

module.exports = mongoose.model('Vendor', VendorSchema);
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
    address : {
        type : String,
    },
    password: String,

});

module.exports = mongoose.model('Vendor', VendorSchema);
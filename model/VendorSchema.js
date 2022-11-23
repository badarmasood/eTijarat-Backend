const mongoose = require('mongoose');

const VendorSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('vendors', VendorSchema);
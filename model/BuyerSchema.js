const { number, object } = require("joi");
const mongoose = require("mongoose");

const address = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    }
});

const card = mongoose.Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    cvc: {
        type: Number
    },
    expiryMonth: {
        type: String,
    },
    expiryYear: {
        type: Number,
    }

});

const buyerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false
    },
    address: [address],
    card: [card]
});



module.exports = mongoose.model('Buyer', buyerSchema);
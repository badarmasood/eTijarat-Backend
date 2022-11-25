const { number, object } = require("joi");
const mongoose = require("mongoose");


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
        required : false
    },
    address: [
        {
            name : {
                type : String
            },
            address : {
                type : String
            }
        }
    ],
    card: [
        {
            name : {
                type : String
            },
            number : {
                type : Number
            },
            cvc : {
                type : Number
            },     
            expiryMonth : {
                type : String,
            },     
            expiryYear : {
                type : Number,
            }     
        }
    ]
});


module.exports = mongoose.model('Buyer', buyerSchema);
const mongoose = require('mongoose');

const permissions = [
    { id : 1 , name : 'Edit Product'},
    { id : 2 , name : 'View Product'}
];

const AssistantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    permission: {
        type : Object,
    },
    vedorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
});

module.exports = mongoose.model('Assistant', AssistantSchema);
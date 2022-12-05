const mongoose = require('mongoose');

const permissions = [
    { id : 1 , name : 'Edit Product'},
    { id : 2 , name : 'View Product'}
];

const AssistantSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    permission: Number
});

module.exports = mongoose.model('Assistant', AssistantSchema);
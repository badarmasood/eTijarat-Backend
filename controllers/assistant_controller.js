const Buyer = require("../model/BuyerSchema");
const Order = require("../model/OrderSchema");
const Product = require("../model/ProductSchema");
const Vendor = require("../model/VendorSchema");
const Assistant = require("../model/AssistantSchema");
const Admin = require("../model/AdminSchema");

const assistant_controller = {
    createAssistant :  async function(req, res, next){
        const { name, email, password , permission } = req.body;

        let emailExists = await Assistant.findOne({ email });

        if (emailExists) {
            return res.status(400).send("Email already Exists.");
        }
        const encPassword = bcryptjs.hashSync(password, 15);
        try {
            const user = await Assistant.create({ name, email, permission, password: encPassword });
            res.status(201).json({ user, message: "Assistant Registered Successfully" });
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },

    getAssistants: async function (req, res, next) {
        try {
            const assistant = await Assistant.find({});
            res.json(assistant);
        }
        catch (error) {
            next({ status: 404, message: error.message })
        }
    }
}

module.exports = assistant_controller;

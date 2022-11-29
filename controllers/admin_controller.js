const Buyer = require("../model/BuyerSchema");
const Order = require("../model/OrderSchema");
const Product = require("../model/ProductSchema");
const Vendor = require("../model/VendorSchema");
const Admin = require("../model/AdminSchema");

const getAllBuyers = async (req, res, next) => {
    try {
        const buyers = await Buyer.find({});
        res.json(buyers);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const getAllVendors = async (req, res, next) => {
    try {
        const vendors = await Vendor.find({});
        res.json(vendors);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

module.exports = {
    getAllBuyers, getAllVendors
}

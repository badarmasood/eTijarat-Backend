const Product = require("../model/ProductSchema");
const Vendor = require("../model/Vendor");

const searchByCategory = async (req, res, next) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const searchByVendor = async (req, res, next) => {
    try {
        const vendors = await Vendor.find({ name : req.params.vendorName })
        res.status(201).json(vendors);
    } catch (error) {
        next({ status: 500, message: error.message });
    }
};

module.exports = { searchByCategory, searchByVendor }

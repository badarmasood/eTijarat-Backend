const Product = require("../model/ProductSchema");
const Vendor = require("../model/VendorSchema");


const search_controller = {

  searchByCategory : async function (req, res, next) {
    try {
      const products = await Product.find({ category: req.params.category });
      res.json(products);
    } catch (error) {
      next({ status: 404, message: error.message });
    }
  },

  searchByName : async function (req, res, next) {
    try {
      const products = await Product.find({ name: req.params.name });
      res.json(products);
    } catch (error) {
      next({ status: 404, message: error.message });
    }
  },

  searchByVendor : async function (req, res, next) {
    try {
      const vendors = await Vendor.find({ name: req.params.vendorName });
      res.status(201).json(vendors);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  getVendorProducts : async function (req, res, next) {
    try {
      const products = await Product.find({ vendorId: req.params.id }).populate("vendorId");
      res.status(201).json(products);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  getAllVendors : async function (req, res, next) {
    try {
      const vendors = await Vendor.find({});
      res.status(201).json(vendors);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  getVendor : async function (req, res, next) {
    try {
      const vendor = await Vendor.findById(req.params.id);
      res.status(201).json(vendor);
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  }

}



module.exports = search_controller;

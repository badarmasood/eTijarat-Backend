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
        const vendors = await Vendor.find({ approvalStatus: true });
        res.json(vendors);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const getApprovalRequests = async (req, res, next) => {
    try {
        const approvalRequests = await Vendor.find({ approvalStatus: false });
        res.json(approvalRequests);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const deleteApprovalRequest = async (req, res, next) => {
    try {
        const approvalRequests = await Vendor.findByIdAndDelete(req.params.id);
        res.json({approvalRequests , message : 'Approval Request Deleted Sucessfully'});
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const approveVendor = async (req, res, next) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    approvalStatus: true
                },
            },
            { new: true }
        );
        res.json({ vendor, message: "Vendor Approved Successfully" });
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

module.exports = { getAllBuyers, getAllVendors, getApprovalRequests, deleteApprovalRequest, approveVendor }

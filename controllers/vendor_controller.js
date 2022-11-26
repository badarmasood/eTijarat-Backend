const Buyer = require("../model/BuyerSchema");
const Order = require("../model/OrderSchema");
const Product = require("../model/ProductSchema");
const Vendor = require("../model/VendorSchema");

const viewProfile = async (req, res, next) => {
    try {
        const buyer = await Vendor.findById(req.user.id);
        // const orders = await Order.find({ buyerId: req.user.id })
        res.json(buyer);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const updateProfile = async (req, res, next) => {
    const id = req.user.id;
    if (!id) {
        return next({ status: 404, message: 'User Not Found' })
    }

    try {
        const buyer = await Buyer.findByIdAndUpdate(id, {
            $set: {
                name: req.body.first_name,
                email: req.body.email,
                phone: req.body.contact,
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Profile Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const myProducts = async (req, res, next) => {
    try {
        const products = await Product.find({vendorId : req.user.id});
        res.json(products);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const addProduct = async (req, res, next) => {
    const address = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
    }
    const buyerID = req.user.id;
    try {
        const buyer = await Buyer.findByIdAndUpdate(buyerID, {
            $push: {
                address: {
                    $each: [address],
                    $position: 0
                }
            },

        }, { new: true })
        res.status(201).json({ buyer, message: "Address Added" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}


const myOrders = async (req, res, next) => {
    const vendorId = req.user.id;
    try {
        const orders = await Order.find({ "products.vendorId": vendorId });
        orders.products = orders.products.filter( product => product.vendorId != vendorId );
        res.json(orders);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
}

const updateCard = async (req, res, next) => {
    const id = req.user.id;
    if (!id) {
        return next({ status: 404, message: 'User Not Found' })
    }

    try {
        const buyer = await Buyer.updateOne({ _id: id, "card._id": req.params.id }, {
            $set: {
                "card.$.name": req.body.name,
                "card.$.number": req.body.number,
                "card.$.cvc": req.body.cvc,
                "card.$.expiryMonth": req.body.expiryMonth,
                "card.$.expiryYear": req.body.expiryYear,
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Address Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

const deleteCard = async (req, res, next) => {
    const id = req.user.id;
    if (!id) {
        return next({ status: 404, message: 'User Not Found' })
    }

    try {
        const buyer = await Buyer.updateOne({ _id: id }, {
            $pull: {
                card: { _id: req.params.id }
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Card Deleted Successfully" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

module.exports = {
    viewProfile, updateProfile,
    myProducts, addProduct,
    myOrders, updateCard, deleteCard
}

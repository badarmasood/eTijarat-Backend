const Buyer = require("../model/BuyerSchema");
const Order = require("../model/OrderSchema");

const viewProfile = async (req, res, next) => {
    try {
        const buyer = await Buyer.findById(req.user.id);
        const orders = await Order.find({ buyerId: req.user.id })
        res.json({ buyer, orders });
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
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Profile Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const getAddresses = async (req, res, next) => {
    try {
        const buyer = await Buyer.findById(req.user.id);
        const address = buyer.address;
        res.json({ address });
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const addAddress = async (req, res, next) => {
    const address = {
        name: req.body.name,
        address: req.body.address,
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

const addCard = async (req, res, next) => {
    const card = {
        name: req.body.name,
        number: req.body.number,
        cvc: req.body.cvc,
        expiryMonth: req.body.expiryMonth,
        expiryYear: req.body.expiryYear,
    }
    const buyerID = req.user.id;
    try {
        const buyer = await Buyer.findByIdAndUpdate(buyerID, {
            $push: {
                card: {
                    $each: [card],
                    $position: 0
                }
            },
        }, { new: true })
        res.status(201).json({ buyer, message: "Card Added" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

const updateAddress = async (req, res, next) => {
    const id = req.user.id;
    if (!id) {
        return next({ status: 404, message: 'User Not Found' })
    }

    try {
        const buyer = await Buyer.updateOne({ _id : id, "address._id" : req.params.id } ,{
            $set: {
                "address.$.name" : req.body.name,
                "address.$.address" : req.body.address,
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Address Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

const deleteAddress = async (req, res, next) => {
    const id = req.user.id;
    if (!id) {
        return next({ status: 404, message: 'User Not Found' })
    }

    try {
        const buyer = await Buyer.updateOne({ _id: id }, {
            $pull: {
                address: { _id: req.params.id }
            }
        }, { new: true })

        res.status(201).json({ buyer, message: "Address Deleted Successfully" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
}

const getCards = async (req, res, next) => {
    try {
        const buyer = await Buyer.findById(req.user.id);
        const cards = buyer.card;
        res.json({ cards });
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
        const buyer = await Buyer.updateOne({ _id: id}, {
            $pull: {
                card : { _id : req.params.id }
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
    getAddresses, addAddress, updateAddress, deleteAddress,
    getCards, addCard, updateCard, deleteCard
}

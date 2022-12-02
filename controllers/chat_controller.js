const Chat = require("../model/ChatSchema");

const getMessage = async (req, res, next) => {
    try {
        const chat = await Chat.find({ buyerId : req.body.buyerId, vendorId : req.body.vendorId }).populate('buyerId' , 'name').populate('vendorId' , 'name');
        res.json(chat);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const sendMessage = async (req, res, next) => {
    const message = {
        buyerId: req.body.buyerId,
        vendorId: req.body.vendorId,
        message: req.body.message,
        sender: req.body.buyerId,
    };
    try {
        const chat = await Chat.create(message);
        res.status(201).json({ chat, message: "Message Sent Successfully" });
    } catch (error) {
        next({ status: 500, message: error.message });
    }
};




module.exports = { getMessage, sendMessage }

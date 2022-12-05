const Chat = require("../model/ChatSchema");

const getMessage = async (req, res, next) => {
    try {
        const chat = await Chat.find({ buyerId: req.body.buyerId, vendorId: req.body.vendorId }).populate('buyerId', 'name').populate('vendorId', 'name');
        res.json(chat);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

const getBuyerChats = async (req, res, next) => {
    const buyerChats = [];
    try {
        const msgs = await Chat.find({ buyerId: req.body.buyerId }).populate('vendorId');
        msgs.forEach(msg => {
            buyerChats.push({
                vendorId: msg.vendorId._id,
                vendorName: msg.vendorId.name,
                vendorEmail: msg.vendorId.email,
            })
        });
        const key = 'vendorId';
        const chats = [...new Map(buyerChats.map(item => [item[key], item])).values()]
        res.json(chats);
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
        sender: req.body.sender,
    };
    try {
        const chat = await Chat.create(message);
        res.status(201).json({ chat, message: "Message Sent Successfully" });
    } catch (error) {
        next({ status: 500, message: error.message });
    }
};

const initiateChat = async (req, res, next) => {
    const message = {
        buyerId: req.body.buyerId,
        sender: req.body.buyerId,
        vendorId: req.body.vendorId,
    };
    try {
        const chat = await Chat.create(message);
        res.status(201).json({ chat, message: "Chat Created" });
    } catch (error) {
        next({ status: 500, message: error.message });
    }
};




module.exports = { getMessage, sendMessage, initiateChat, getBuyerChats }

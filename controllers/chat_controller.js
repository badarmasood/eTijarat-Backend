const Chat = require("../model/ChatSchema");

// Initiate chat when buyer tries to send msg first time
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

// Get Msgs of a Chat
const getMessages = async (req, res, next) => {
    console.log(req.body)
    try {
        const chat = await Chat.find({ buyerId: req.body.buyerId, vendorId: req.body.vendorId }).populate('buyerId', 'name').populate('vendorId', 'name');
        res.json(chat);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};

//Send Msg
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

// Get Buyer Chats
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

// Get Vendor Chats
const getVendorChats = async (req, res, next) => {
    const vendorChats = [];
    try {
        const msgs = await Chat.find({ vendorId: req.body.vendorId }).populate('buyerId');
        msgs.forEach(msg => {
            vendorChats.push({
                buyerId: msg.buyerId._id,
                buyerName: msg.buyerId.name,
                buyerEmail: msg.buyerId.email,
            })
        });
        const key = 'buyerId';
        const chats = [...new Map(vendorChats.map(item => [item[key], item])).values()]
        res.json(chats);
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};


module.exports = { initiateChat, getMessages, sendMessage, getBuyerChats, getVendorChats }

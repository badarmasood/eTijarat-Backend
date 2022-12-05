const express = require("express");

const chatController = require("../controllers/chat_controller");

const router = express.Router();

router.post("/messages", chatController.getMessages);
router.post("/message/send", chatController.sendMessage);
router.post("/create", chatController.initiateChat);

router.post("/buyer/chats", chatController.getBuyerChats);
router.post("/vendor/chats", chatController.getVendorChats);

module.exports = router;

const express = require("express");

const chatController = require("../controllers/chat_controller");

const router = express.Router();

router.get("/messages", chatController.getMessage);
router.post("/messages", chatController.sendMessage);

module.exports = router;

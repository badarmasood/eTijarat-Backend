const express = require("express");
const router = express.Router();

const assistantController = require("../controllers/assistant_controller");

router.post("/badar/login", assistantController.loginAssistant);

module.exports = router;

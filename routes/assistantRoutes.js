const express = require("express");
const assistantController = require("../controllers/assistant_controller");

const router = express.Router();

router.get("/register", assistantController.createAssistant);
router.get("/all:vendorId", assistantController.getAssistants);


module.exports = router;

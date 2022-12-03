const express = require('express');
const searchController = require('../controllers/search_controller');

const router = express.Router();

// Routes
router.get("/vendors", searchController.getAllVendors);
router.get("/vendor/:id", searchController.getVendor);



module.exports = router;
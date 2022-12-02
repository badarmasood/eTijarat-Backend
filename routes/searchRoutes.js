const express = require('express');
const searchController = require('../controllers/search_controller');

const router = express.Router();

// Routes
router.get('/byCategory/:category', searchController.searchByCategory);
router.get('/byVendor/:vendorName', searchController.searchByVendor);

module.exports = router;
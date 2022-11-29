const express = require('express');
const authController = require('../controllers/auth_controller');

const router = express.Router();

// Vendor Authentication
router.post('/vendor/register', authController.registerVendor);
router.post('/vendor/login', authController.loginVendor);

// Buyer Authentication
router.post('/buyer/register', authController.registerBuyer);
router.post('/buyer/login', authController.loginBuyer);

// Assistant Authentication
router.post('/assistant/register', authController.registerBuyer);
router.post('/assistant/login', authController.loginBuyer);

module.exports = router;
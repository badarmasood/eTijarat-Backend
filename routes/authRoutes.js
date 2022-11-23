const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();


router.post('/vendor/register', authController.registerVendor);
router.post('/vendor/login', authController.loginVendor);

router.post('/buyer/register', authController.registerBuyer);
router.post('/buyer/login', authController.loginBuyer);


module.exports = router;
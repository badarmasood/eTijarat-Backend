const express = require('express');
const ordersController = require('../controllers/orders_controller');
const vendorController = require('../controllers/vendor_controller');
const productsController = require('../controllers/products_controller');
const adminController = require('../controllers/admin_controller');

const router = express.Router();

router.get('/orders', ordersController.getAllOrders);
router.get('/order/:id', ordersController.getorder);

router.get('/buyers', adminController.getAllBuyers);
router.get('/vendors', adminController.getAllVendors);

router.get('/all', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);



module.exports = router;

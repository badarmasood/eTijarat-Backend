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

router.get('/vendors/approval-requests', adminController.getApprovalRequests);
router.put('/vendor/approve/:id', adminController.approveVendor);
router.delete('/vendor/delete/:id', adminController.deleteApprovalRequest);

router.get('/products', productsController.getAllProducts);
router.get('/product/:id', productsController.getProduct);



module.exports = router;

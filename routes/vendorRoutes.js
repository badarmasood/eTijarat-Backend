const express = require('express');
const ordersController = require('../controllers/orders_controller');
const vendorController = require('../controllers/vendor_controller');
const productsController = require('../controllers/products_controller');
const assistantController = require("../controllers/assistant_controller");


const router = express.Router();

// Profile Routes
router.get('/profile', vendorController.viewProfile);
router.put('/profile/update', vendorController.updateProfile);

// Product Routes
router.get('/products', vendorController.myProducts);
router.post('/product', productsController.create);
router.put('/product/:id', productsController.update);
router.delete('/product/:productID?', productsController.destroy);

// Order Routes
router.get('/orders', vendorController.myOrders);
router.get('/order/:id', vendorController.viewOrder);
router.put('/order/update/:id', ordersController.update);
router.delete('/order/product/delete/:id', ordersController.removeProductFromOrder);


// Assistant Routes
router.get("/assistant/create", assistantController.createAssistant);
router.get("/assistants", assistantController.getAssistants);

module.exports = router;

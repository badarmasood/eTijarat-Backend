const express = require('express');
const ordersController = require('../controllers/orders_controller');
const vendorController = require('../controllers/vendor_controller');
const productsController = require('../controllers/products_controller');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/profile', vendorController.viewProfile);
router.put('/profile/update', vendorController.updateProfile);

//Product Routes
router.get('/products', vendorController.myProducts);
router.get('/product/:id', productsController.getProduct);
router.post('/product', authMiddleWare, productsController.create);
router.put('/product/:id', authMiddleWare, productsController.update);
router.delete('/product/:productID?', authMiddleWare, productsController.destroy);

//Order Routes
router.get('/orders', vendorController.myOrders);
router.get('/order/:id', vendorController.viewOrder);
router.put('/order/update/:id', ordersController.update);


module.exports = router;

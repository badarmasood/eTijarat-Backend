const express = require('express');
const ordersController=require('../controllers/orders_controller');
const buyerController=require('../controllers/buyer_controller');

const router = express.Router();

router.get('/orders', ordersController.getMyOrders);
router.get('/order/:id' , ordersController.getorder);
router.get('/profile', buyerController.viewProfile);
router.get('/profile/update', buyerController.updateProfile);
router.get('/address/add', buyerController.addAddress);
router.get('/card/add', buyerController.addCard);

module.exports = router;

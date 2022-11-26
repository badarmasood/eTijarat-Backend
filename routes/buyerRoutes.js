const express = require('express');
const ordersController=require('../controllers/orders_controller');
const buyerController=require('../controllers/buyer_controller');

const router = express.Router();

// Order Routes
router.get('/orders', ordersController.getMyOrders);
router.get('/order/:id' , ordersController.getorder);
router.post('order/create', ordersController.create);

// Profile Routes
router.get('/profile', buyerController.viewProfile);
router.put('/profile/update', buyerController.updateProfile);

// Address Routes
router.get('/addresses', buyerController.getAddresses);
router.post('/address', buyerController.addAddress);
router.put('/address/:id', buyerController.updateAddress);
router.delete('/address/:id', buyerController.deleteAddress);

// Card Routes
router.get('/cards', buyerController.getCards);
router.post('/card', buyerController.addCard);
router.put('/card/:id', buyerController.updateCard);
router.delete('/card/:id', buyerController.deleteCard);

module.exports = router;

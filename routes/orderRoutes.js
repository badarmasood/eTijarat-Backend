const express = require('express');
const ordersController=require('../controllers/orders_controller')
const router = express.Router();

router.get('/all' , ordersController.getAllOrders);
router.get('/buyer/:id', ordersController.getMyOrders)
router.get('/:id' , ordersController.getorder);
router.post('/create' , ordersController.create);
router.put('/update/:id' , ordersController.update);
router.delete('/destroy/:orderID?' , ordersController.destroy);

module.exports = router;
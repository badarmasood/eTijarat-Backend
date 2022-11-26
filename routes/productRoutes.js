const express = require('express');
const productsController = require('../controllers/products_controller')
const router = express.Router();
const authMiddleWare = require('../middlewares/authMiddleware')

router.get('/all', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);

router.post('/create', authMiddleWare, productsController.create);
router.put('/update/:id', authMiddleWare, productsController.update);
router.delete('/destroy/:productID?', authMiddleWare, productsController.destroy);

module.exports = router;
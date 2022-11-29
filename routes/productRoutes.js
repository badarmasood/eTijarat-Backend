const express = require('express');
const productsController = require('../controllers/products_controller');

const router = express.Router();

router.get('/all', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);

module.exports = router;
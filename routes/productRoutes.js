const express = require('express');
const productsController=require('../controllers/products_controller')
const router = express.Router();

router.get('/all' , productsController.getAllProducts);
// router.get('/myBlogs', blogController.getMyBlogs);
router.get('/:id' , productsController.getProduct);
router.post('/create' , productsController.create);
router.put('/update/:id' , productsController.update);
router.delete('/destroy/:productID?' , productsController.destroy);

module.exports = router;
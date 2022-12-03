const express = require("express");
const productsController = require("../controllers/products_controller");
const searchController = require("../controllers/search_controller");

const router = express.Router();
// /products
router.get("/all", productsController.getAllProducts);
router.get("/:id", productsController.getProduct);

router.get("/vendor/:id", searchController.getVendorProducts);
router.get("/search/:category", searchController.searchByCategory);
router.get("/search/vendor/:id", searchController.searchByVendor);

// router.post("/update/all", productsController.updateAll);
module.exports = router;
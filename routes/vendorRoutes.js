const express = require("express");
const ordersController = require("../controllers/orders_controller");
const vendorController = require("../controllers/vendor_controller");
const productsController = require("../controllers/products_controller");
const assistantController = require("../controllers/assistant_controller");
const couponController = require("../controllers/coupon_controller");

const router = express.Router();

// Profile Routes
router.get("/profile", vendorController.viewProfile);
router.put("/profile/update", vendorController.updateProfile);

// Product Routes
router.get("/products", vendorController.myProducts);
router.post("/product", productsController.create);
router.put("/product/:id", productsController.update);
router.delete("/product/:productID?", productsController.destroy);

// Order Routes
router.get("/orders/mine", vendorController.myOrders);
router.get("/order/:id", vendorController.viewOrder);
router.put("/order/update/:id", ordersController.update);
router.delete("/order/product/delete/:id",ordersController.removeProductFromOrder);

// Coupon Routes 
router.get("/coupon", couponController.getMyCoupons);
router.post("/coupon", couponController.generateCoupon);
router.post("/coupon/:id", couponController.validateCoupon);

// Assistant Routes
router.get("/assistants", assistantController.getAssistants);
router.post("/assistant/create", assistantController.createAssistant);
router.post("/assistant/login", assistantController.loginAssistant);
router.post("/assistant/:id", assistantController.deleteAssistant);

module.exports = router;

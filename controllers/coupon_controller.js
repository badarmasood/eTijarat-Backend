const Coupon = require("../model/couponSchema");

const coupon_controller = {
    generateCoupon: async function (req, res, next) {
        const data = {
            code: req.body.code,
            discount: req.body.discount,
            productId: req.body.productId,
            vendorId: req.user.id,
        };
        try {
            const coupon = await Coupon.create(data);
            res.status(201).json({ coupon, message: "Coupon Generated Successfully" });
        } catch (error) {
            next({ status: 500, message: error.message });
        }
    },
    getMyCoupons: async function (req, res, next) {
        try {
            const coupons = await Coupon.find({ vendorId: req.user.id });
            res.json(coupons);
        }
        catch (error) {
            next({ status: 404, message: error.message })
        }
    },
    validateCoupon: async function (req, res, next) {
        try {
            const coupon = await Coupon.findById(req.params.id);
            res.json({ coupon, message: "Coupon Matched" });
        }
        catch (error) {
            next({ status: 404, message: error.message })
        }
    }
}

module.exports = coupon_controller
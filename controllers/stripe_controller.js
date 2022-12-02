
require("dotenv").config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {

  const line_items = req.body.products.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [`https://bazaar.ui-lib.com/${item.imgUrl}`],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      customer_email : req.user.email,
      mode: "payment",
      success_url: "http://localhost:3000/order-confirmation",
      cancel_url: "http://localhost:3000/checkout-alternative",
    });
    res.send({ url: session.url });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createPayment };

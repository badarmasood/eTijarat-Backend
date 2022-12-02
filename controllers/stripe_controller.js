const express = require("express");
const app = express();
require("dotenv").config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  console.log("Orders", req.body);

  const line_items = req.body.products.map((item) => {
    console.log("item", item);
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

  const card = {
    exp_month: "8",
  };
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer:req.user.id,
      mode: "payment",
      success_url: "http://localhost:3000/order-confirmation",
      cancel_url: "http://localhost:3000/checkout-alternative",
    });
    console.log("session", session);
    res.send({ url: session.url });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createPayment };

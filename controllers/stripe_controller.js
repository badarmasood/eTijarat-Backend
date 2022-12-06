const Order = require("../model/OrderSchema");
require("dotenv").config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  let currency = req.body.details.currency;

  req.body.products.forEach((product) => {
    if (currency === "pkr") {
      product.price = product.price * 220;
    } else if (currency === "inr") {
      product.price = product.price * 81;
    } else if (currency === "gbp") {
      product.price = product.price * 0.81;
    }
  });

  const line_items = req.body.products.map((item) => {
    let text = item.imgUrl;
    const images = [];
    let result = text.replace(
      "https://bazar-react.vercel.app",
      "https://bazaar.ui-lib.com"
    );
    images.push(result);
    return {
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          images: [`${result}`],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });
  const data = {
    products: req.body.products,
    status: req.body.status,
    details: req.body.details,
    buyerId: req.body.buyerId,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      customer_email: req.user.email,
      mode: "payment",
      success_url: "http://localhost:3000/order-confirmation",
      cancel_url: "http://localhost:3000/checkout-alternative",
    });
    const order = await Order.create(data);
    res.send({
      url: session.url,
      order,
      message: "Order Created Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

const instantCheckout = async (req, res) => {
  const data = {
    products: req.body.products,
    status: req.body.status,
    details: req.body.details,
    buyerId: req.body.buyerId,
  };

  try {
    const order = await Order.create(data);
    res.status(201).json({ order, message: "Order Created Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }

  let currency = req.body.currency;
  if (currency === "pkr") {
    currency = req.body.products.price * 220;
  }

  const line_items = req.body.products.map((item) => {
    return {
      price_data: {
        currency: currency,
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
      customer_email: req.user.email,
      mode: "payment",
      success_url: "http://localhost:3000/order-confirmation",
      cancel_url: "http://localhost:3000/checkout-alternative",
    });
    res.send({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createPayment, instantCheckout };
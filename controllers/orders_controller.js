const Order = require("../model/OrderSchema");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
    res.json({ orders });
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getorder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    res.json({ order });
  }
  catch (error) {
    next({ status: 404, message: error.message })
  }
};

const getMyOrders = async (req, res, next) => {
  const id = req.user.id;
  try {
    const orders = await Order.find({ buyerId: id })
    res.json({ orders });
  }
  catch (error) {
    next({ status: 404, message: error.message })
  }
};

const create = async (req, res, next) => {
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
};

const update = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: 'ID Is Missing' })
  }

  try {
    const order = await Order.findByIdAndUpdate(id, {
      $set: {
        status: req.body.status,
      }
    }, { new: true })

    res.status(201).json({ order, message: "Orders Record Updated" })
  }
  catch (error) {
    next({ status: 500, message: error.message })
  }
};

const destroy = async (req, res, next) => {
  const id = req.params.orderID;
  try {
    const order = await Order.findByIdAndDelete(id)
    res.json({ message: 'Order Deleted' });
  }
  catch (error) {
    next({ status: 500, message: error.message })
  }
};

const removeProductFromOrder = async (req, res, next) => {
  const orderID = req.params.id;
  try {
    const order = await Order.updateOne({ _id: orderID }, {
      $pull: {
        products: { _id: req.body.productId }
      }
    }, { new: true })

    res.json({ message: 'Product Removed from Order' , order });
  }
  catch (error) {
    next({ status: 500, message: error.message })
  }
};



module.exports = { getAllOrders, create, update, destroy, getorder, getMyOrders, removeProductFromOrder }

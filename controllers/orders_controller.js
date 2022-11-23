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

const update = async (req , res , next) => {
    const id = req.params.id;
    if(!id) {
        return next({ status : 404 , message : 'ID Is Missing' })
    }

    try {
        const order = await Order.findByIdAndUpdate(id , {
            $set : {
                status: req.body.status,
            }
        }, {new : true})
        
        res.status(201).json({ order , message: "Orders Record Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const destroy = async (req , res , next) => {
    const id = req.params.orderID;
    console.log(id)
    try {
        const order = await Order.findByIdAndDelete(id)
        // console.log(order)
        res.json({message : 'Order Deleted'});
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

// module.exports = { getAllProducts, create, update, destroy, getMyBlogs, getBlog }
module.exports = { getAllOrders,create,update, destroy, getorder }

const Product = require("../model/ProductSchema");
const {
  addBlogValidation,
  updateBlogValidation,
} = require("../validations/BlogValidation");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.json({ products });
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json({ product });
    }
    catch (error) {
        next({ status: 404, message: error.message })
    }
};
const create = async (req, res, next) => {
  const data = {
    price: req.body.price,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    stock: req.body.stock,
    description: req.body.description,
    category: req.body.category,
    sale_price: req.body.sale_price,
    rating: req.body.rating,
    imgGroup: req.body.imgUrl,
    vendorId: req.body.vendorId,
  };
  try {
    
    const product = await Product.create(data);
    res.status(201).json({ product, message: "Product Created Successfully" });
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
        const product = await Product.findByIdAndUpdate(id , {
            $set : {
                price: req.body.price,
                title: req.body.title,
                imgUrl: req.body.imgUrl,
                stock: req.body.stock,
                description: req.body.description,
                category: req.body.category,
                discount: req.body.discount,
            }
        }, {new : true})
        
        res.status(201).json({ product , message: "Products Record Updated" })
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

const destroy = async (req , res , next) => {
    const id = req.params.productID;
    try {
        const blog = await Product.findByIdAndDelete(id)
        res.json({message : 'Product Deleted'});
    }
    catch (error) {
        next({ status: 500, message: error.message })
    }
};

// module.exports = { getAllProducts, create, update, destroy, getMyBlogs, getBlog }
module.exports = { getAllProducts, create,destroy,update,getProduct};

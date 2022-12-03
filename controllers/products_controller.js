const Product = require("../model/ProductSchema");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("vendorId");
    res.json(products);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).populate(
      "vendorId"
    );
    console.log(product);
    res.json(product);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const create = async (req, res, next) => {
  let product;
  console.log("req", req.body);
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
    vendorId: req.user.id,
    id: "123",
  };
  try {
    product = await Product.create(data);
  } catch (error) {
    next({ status: 500, message: error.message });
  }
  try {
    const temp = product._id;
    console.log("temp", temp);
    product = await Product.findByIdAndUpdate(
      product._id,
      {
        $set: {
          id: temp,
        },
      },
      { new: true }
    );

    res.status(201).json({ product, message: "Product Created Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

// const updateAll = async (req, res, next) => {
//   let allProducts, temp;
//   try {
//     allProducts = await Product.find({});
//     allProducts.forEach((item) => {
//       temp = item._id;
//       item.id = temp;
//     });

//     console.log("allProducts", allProducts);
//   } catch (error) {
//     console.log("error", error);
//   }

//   try {
//     const p = await Product.deleteMany({});
//   } catch (error) {
//     console.log("error", error);
//   }

//   console.log("allProducts2", allProducts);

//   try {
//     const prod = await Product.insertMany(allProducts);
//     console.log("allProducts 3", allProducts);
//     // res.status(201).json(prod, { message: "Products Record Updated" });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

const update = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: "ID Is Missing" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          price: req.body.price,
          title: req.body.title,
          imgUrl: req.body.imgUrl,
          stock: req.body.stock,
          description: req.body.description,
          category: req.body.category,
          discount: req.body.discount,
        },
      },
      { new: true }
    );

    res.status(201).json({ product, message: "Products Record Updated" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const destroy = async (req, res, next) => {
  const id = req.params.productID;
  try {
    const blog = await Product.findByIdAndDelete(id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const addReview = async (req, res, next) => {
  const allProducts = {
    customerName: req.user.name,
    comment: req.body.comment,
  };
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            $each: [allProducts],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    res.status(201).json({ product, message: "Review Added" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  create,
  destroy,
  update,
  getProduct,
  addReview,
};

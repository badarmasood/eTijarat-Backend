const Vendor = require("../model/VendorSchema");
const Buyer = require("../model/BuyerSchema");
const Admin = require("../model/AdminSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerVendor = async (req, res, next) => {
  const { name, email, password } = req.body;

  let emailExists = await Vendor.findOne({ email });

  if (emailExists) {
    return res.status(400).send("Email already Exists.");
  }
  const encPassword = bcryptjs.hashSync(password, 15);
  try {
    const user = await Vendor.create({ name, email, password: encPassword });
    res.status(201).json({ user, message: "Vendor Registered Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const loginVendor = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Vendor.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "This Email Doesn't Exist",
      });
    }
    const dbPassword = user.password;
    const isSamePassword = await bcryptjs.compare(password, dbPassword);
    if (isSamePassword) {
      const JsonPayLoad = { id: user._id, name: user.name, email: user.email };
      const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      res.json({
        token,
        vendorId: user._id,
        message: "Logged In Successfully",
      });
    } else {
      next({ status: 404, message: "Password is Incorrect" });
    }
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const registerBuyer = async (req, res, next) => {
  const { name, email, password } = req.body;

  let emailExists = await Buyer.findOne({ email });

  if (emailExists) {
    return res.status(400).send("Email already Exists.");
  }
  const encPassword = bcryptjs.hashSync(password, 15);
  try {
    const user = await Buyer.create({ name, email, password: encPassword });
    res.status(201).json({ user, message: "Buyer Registered Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const loginBuyer = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Buyer.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "This Email Doesn't Exist",
      });
    }
    const dbPassword = user.password;
    const isSamePassword = await bcryptjs.compare(password, dbPassword);
    if (isSamePassword) {
      const JsonPayLoad = { id: user._id, name: user.name, email: user.email };
      const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      res.json({
        token,
        buyerId: user._id,
        message: "Logged In Successfully",
      });
    } else {
      next({
        status: 404,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "This Email Doesn't Exist",
      });
    }
    const dbPassword = user.password;
    const isSamePassword = await bcryptjs.compare(password, dbPassword);
    if (isSamePassword) {
      const JsonPayLoad = { id: user._id, name: user.name, email: user.email };
      const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY, {
        expiresIn: "3d",
      });
      res.json({
        token,
        AdminId: user._id,
        message: "Logged In Successfully",
      });
    } else {
      next({
        status: 404,
        message: "Password is Incorrect",
      });
    }
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = { registerVendor, loginVendor, registerBuyer, loginBuyer, loginAdmin };

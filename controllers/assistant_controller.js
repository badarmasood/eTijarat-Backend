const Assistant = require("../model/AssistantSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const assistant_controller = {
  createAssistant: async function (req, res, next) {
    const { name, email, password, permission } = req.body;

    let emailExists = await Assistant.findOne({ email });

    if (emailExists) {
      return res.status(400).send("Email already Exists.");
    }
    const encPassword = bcryptjs.hashSync(password, 15);
    try {
      const user = await Assistant.create({
        name,
        email,
        permission,
        vendorId: req.user.id,
        password: encPassword,
      });
      res
        .status(201)
        .json({ user, message: "Assistant Registered Successfully" });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  loginAssistant: async function (req, res, next) {
    console.log("body", req.body);
    const { email, password } = req.body;
    try {
      const user = await Assistant.findOne({ email });
      if (!user) {
        return next({
          status: 404,
          message: "This assistant Email Doesn't  Exist",
        });
      }
      const dbPassword = user.password;
      const isSamePassword = await bcryptjs.compare(password, dbPassword);
      if (isSamePassword) {
        const JsonPayLoad = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(JsonPayLoad, process.env.SECRET_KEY, {
          expiresIn: "3d",
        });
        res.json({
          token,
          assistantId: user._id,
          message: "Logged In Successfully",
        });
      } else {
        next({ status: 404, message: "Password is Incorrect" });
      }
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  },

  getAssistants: async function (req, res, next) {
    try {
      const assistant = await Assistant.find({ vendorId: req.user.id });
      res.json(assistant);
    } catch (error) {
      next({ status: 404, message: error.message });
    }
  },

  deleteAssistant: async function (req, res, next) {
    try {
      const assistant = await Assistant.findByIdAndDelete(req.params.id);
      res.json(assistant);
    } catch (error) {
      next({ status: 404, message: error.message });
    }
  },
};

module.exports = assistant_controller;

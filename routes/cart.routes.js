const express = require("express");

//Controllers
const { addCartUser, addProduct } = require("../controllers/cart.controller");

//Middleware
const { protectSession } = require("../middlewares/auth.middlewares");
const { cartExist } = require("../middlewares/cart.middleware");
const cartRouter = express.Router();

//Endpoints
cartRouter.use(protectSession);

cartRouter.post("/", addCartUser);

cartRouter.get("/", cartExist, addProduct);

module.exports = { cartRouter };

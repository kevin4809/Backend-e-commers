const express = require("express");

//Controllers
const {
  addProduct,
  updateCart,
  deleteall,
  getCart
} = require("../controllers/cart.controller");

//Middleware
const { protectSession } = require("../middlewares/auth.middlewares");
const { cartExist, checkQuantity } = require("../middlewares/cart.middleware");
const { checkProducts } = require("../middlewares/productsInCart.middleware");
const cartRouter = express.Router();

//Endpoints
cartRouter.use(protectSession);

cartRouter.get("/", getCart);

cartRouter.post("/", cartExist, checkProducts, checkQuantity, addProduct);

cartRouter.patch("/", cartExist, checkQuantity, updateCart);

cartRouter.delete("/", deleteall);



module.exports = { cartRouter };

const express = require("express");

//Controllers
const { addCartUser, addProduct } = require("../controllers/cart.controller");

//Middleware
const { protectSession } = require("../middlewares/auth.middlewares");
const { cartExist, checkQuantity } = require("../middlewares/cart.middleware");
const { checkProducts } = require("../middlewares/productsInCart.middleware");
const cartRouter = express.Router();

//Endpoints
cartRouter.use(protectSession);

cartRouter.post("/", addCartUser);

cartRouter.get("/", cartExist, checkProducts, checkQuantity, addProduct);

module.exports = { cartRouter };

const express = require("express");

//Controllers
const {
  createProduct,
  getAllProducts,
  getProductId,
  updateProducts,
} = require("../controllers/products.controller");

const productRouter = express.Router();

//middlewares

const { protectSession, protectProducts } = require("../middlewares/auth.middlewares");
const { productExist } = require("../middlewares/product.middleware");

//Endpoints
productRouter.get("/:id", getProductId);

productRouter.get("/", getAllProducts);

productRouter.use(protectSession);

productRouter.post("/", createProduct);

productRouter.patch("/:id", productExist, protectProducts, updateProducts);

module.exports = { productRouter };

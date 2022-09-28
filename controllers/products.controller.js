//Models
const { Products } = require("../models/products.model");
const { Categories } = require("../models/categories.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createProduct = catchAsync(async (req, res, next) => {
  const { title, price, categoryId, quantity, description } = req.body;
  const { sessionUser } = req;

  const validCategory = await Categories.findOne({ where: { id: categoryId } });

  if (!validCategory) {
    res.status(404).json({
      status: "error",
      message: "The category Id doesn't exist",
    });
  }
  const create = await Products.create({
    title,
    price,
    quantity,
    categoryId,
    description,
    userId: sessionUser.id,
  });
  res.status(201).json({
    status: "success",
    data: { create },
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const getActiveProducts = await Products.findAll({
    where: { status: "active" },
  });

  res.status(201).json({
    status: "success",
    data: { getActiveProducts },
  });
});

const getProductId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productId = await Products.findOne({ id });

  res.status(201).json({
    status: "success",
    data: { productId },
  });
});

const updateProducts = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity } = req.body;
  const { product } = req;

  await product.update({
    title,
    description,
    price,
    quantity,
  });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  updateProducts,
};

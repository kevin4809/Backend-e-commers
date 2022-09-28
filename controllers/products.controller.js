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

const toDisableProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "disable" });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Categories.create({ name });

  res.status(200).json({
    status: "success",
    data: { newCategory },
  });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await Categories.findAll();

  res.status(201).json({
    status: "success",
    data: { allCategories },
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateCategories = await Categories.findOne({ where: { id } });

  if (!updateCategories) {
    res.status(404).json({
      status: "error",
      message: "The category Id doesn't exist",
    });
  }

  await updateCategories.update({ name });

  res.status(201).json({
    status: "success",
    data: { updateCategories },
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  updateProducts,
  toDisableProduct,
  createCategory,
  getAllCategories,
  updateCategory,
};

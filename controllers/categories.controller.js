const { catchAsync } = require("../utils/catchAsync.util");
const { Categories } = require("../models/categories.model");

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

module.exports = { createCategory, getAllCategories };

//Models
const { Products } = require("../models/products.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");

const createProduct = catchAsync(async (req, res, next) => {
  const { title, price, categoryId, quantity } = req.body;

  
});

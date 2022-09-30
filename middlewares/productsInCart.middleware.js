const { ProductsInCarts } = require("../models/productsInCar.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const checkProducts = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const productsInCart = await ProductsInCarts.findAll();

  productsInCart.map((product) => {
    if (productId === product.productId) {
      if (product.status === "active") {
        return next(
          new AppError("this product already exist in your cart", 404)
        );
      }
    }
  });

  // If productsInCart doesn't exist, send error message
  if (!productsInCart) {
    return next(new AppError("productsInCart not found", 404));
  }

  // req.anyPropName = 'anyValue'
  req.productsInCart = productsInCart;
  next();
});

module.exports = {
  checkProducts,
};

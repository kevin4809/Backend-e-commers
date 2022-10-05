const { ProductsInCarts } = require("../models/productsInCar.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const checkProducts = catchAsync(async (req, res, next) => {
  const { cart } = req;
  const { productId, quantity } = req.body;

  const cartProduct = await ProductsInCarts.findOne({
    where: { cartId: cart.id, productId: productId, status: "active" },
  });

  if (cartProduct) {
    if (cartProduct.status === "active") {
      return next(new AppError("this product already exist in your cart", 404));
    } else {
      await cartProduct.update({ quantity, status: "active" });
    }
  }
  req.cartProduct = cartProduct;
  next();
});

module.exports = {
  checkProducts,
};

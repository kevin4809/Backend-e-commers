//Models
const { Carts } = require("../models/carts.model");
const { ProductsInCarts } = require("../models/productsInCar.model");
const { Products } = require("../models/products.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const addCartUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const newCart = await Carts.create({ userId: sessionUser.id });

  res.status(201).json({
    status: "success",
    data: { newCart },
  });
});

const addProduct = catchAsync(async (req, res, next) => {
  const { cart } = req;
  const { productId, quantity } = req.body;

  const checkProduct = await Products.findOne({
    where: { id: productId },
  });

  if (!checkProduct) {
    return next(new AppError("product not found", 404));
  }

  if (checkProduct.quantity < quantity) {
    return next(
      new AppError(
        "in this moment we don't have that quantity of products",
        404
      )
    );
  }

  const newProductInCart = await ProductsInCarts.create({
    productId,
    quantity,
    cartId: cart.id,
  });

  res.status(201).json({
    status: "success",
    data: { newProductInCart },
  });
});

module.exports = { addCartUser, addProduct };

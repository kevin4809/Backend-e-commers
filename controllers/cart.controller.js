//Models
const { ProductsInCarts } = require("../models/productsInCar.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const addProduct = catchAsync(async (req, res, next) => {
  const { sessionUser, productsInCart } = req;
  const { productId, quantity } = req.body;

  if (!productsInCart) {
    const newProductInCart = await ProductsInCarts.create({
      productId,
      quantity,
      cartId: sessionUser.id,
    });

    res.status(201).json({
      status: "success",
      data: { newProductInCart },
    });
  } else {
    res.status(201).json({
      status: "success",
      data: { productsInCart },
    });
  }
});

const updateCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  const userProducts = await ProductsInCarts.findOne({
    where: { cartId: sessionUser.id, productId: productId },
  });

  if (quantity === 0) {
    await userProducts.update({ quantity: quantity, status: "removed" });
  } else {
    await userProducts.update({ quantity: quantity, status: "active" });
  }

  res.status(201).json({
    status: "success",
    data: { userProducts },
  });
});

const deleteall = catchAsync(async (req, res, next) => {
  const delate = await ProductsInCarts.destroy({ where: { cartId: 1 } });

  res.status(201).json({
    status: "success",
    data: { delate },
  });
});

const getCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const prueba = await ProductsInCarts.findAll({
    where: { cartId: sessionUser.id },
  });

  res.status(201).json({
    status: "success",
    data: { prueba },
  });
});

module.exports = { addProduct, updateCart, deleteall, getCart };

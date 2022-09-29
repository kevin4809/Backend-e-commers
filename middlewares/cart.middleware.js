// Models
const { Carts } = require("../models/carts.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const cartExist = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Carts.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });

  // If cart doesn't exist, send error message
  if (!cart) {
    const newCart = await Carts.create({ userId: sessionUser.id });
    res.status(201).json({
      status: "success",
      message: "created new cart",
      data: { newCart },
    });
    req.cart = cart;
    next();
  }
  // req.anyPropName = 'anyValue'
  req.cart = cart;
  next();
});

module.exports = {
  cartExist,
};

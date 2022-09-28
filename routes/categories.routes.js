const express = require("express");

//Controllers
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories.controller");

//Router
const categoryRouter = express.Router();

//EndPoints
categoryRouter.post("/", createCategory);

categoryRouter.get("/", getAllCategories);

module.exports = { categoryRouter };

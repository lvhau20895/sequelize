// file quản lý router user & các phương thức api CRUD

const express = require("express");
const {
	getFood,
	getFoodById,
	deleteFood,
	updateFood,
	createFood
} = require("../Controllers/foodController");

const foodRouter = express.Router();

// kết nối với các controller
foodRouter.get("/get-food", getFood);
foodRouter.get("/get-food-by-id/:id", getFoodById);
foodRouter.post("/create-food", createFood);
foodRouter.put("/update-food/:id", updateFood);
foodRouter.delete("/delete-food/:id", deleteFood);

module.exports = foodRouter;

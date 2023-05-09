// file quản lý router user & các phương thức api CRUD

const express = require("express");
const {
	getUser,
	getUserById,
	getUserPagination,
	getTotalCountUser,
	createUser,
	updateUser,
	deleteUser
} = require("../Controllers/userController");

const userRouter = express.Router();

// kết nối với các controller
userRouter.get("/get-user", getUser);
userRouter.get("/get-user-by-id/:id", getUserById);
userRouter.get("/get-user-pagination", getUserPagination);
userRouter.get("/get-user-total", getTotalCountUser);
userRouter.post("/create-user", createUser);
userRouter.put("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteUser);

module.exports = userRouter;

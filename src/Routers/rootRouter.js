// file chính quản lý các router, tách các api theo đối tượng

const express = require("express");
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");
const foodRouter = require("./foodRouter");
const router = express.Router();

router.use("/user", userRouter); // tách đối tượng url user và kết nối đến các phương thức CRUD trong userRouter
router.use("/task", taskRouter);
router.use("/food", foodRouter);

module.exports = router;

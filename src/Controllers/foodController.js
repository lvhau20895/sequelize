// file quản lý các controller xử lý request & response của user

const { successCode, errorCode, failCode } = require("../Utils/response");
const initModels = require("../Models/init-models"); // thay vì dùng Class User thì khi sử dụng Database First sẽ dùng hàm initModels()
const sequelize = require("../Models/index"); // hàm initModels sẽ nhận vào tham số sequelize để kết nối CSDL

const models = initModels(sequelize);

const getFood = async (req, res) => {
	try {
		// relationship: lấy dữ liệu 1 - N or N - N
		let data = await models.user.findAll({
			// include: "type" // truy vấn dựa theo as trong file init-models.js

			// JOIN 3 bảng N - N
			// include: ["user", "food"] // lấy dữ liệu từ 3 bảng

			// JOIN 2 bảng N - N
			include: "food_id_foods"
		});
		successCode(res, "lấy danh sách food thành công", data);
	} catch (error) {
		errorCode(res, "lỗi server");
	}
};

const getFoodById = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await models.user.findByPk(id);
		// res.status(200).send(data);
		successCode(res, "lấy user theo id thành công", data);
	} catch (error) {
		// res.status(500).send("error server");
		errorCode(res, "lỗi server");
	}
};

const createFood = async (req, res) => {
	try {
		const { fullName, email, passWord } = req.body;
		const newUser = { fullName, email, passWord };
		const data = await models.user.findAll();
		const index = data.findIndex(user => user.email === email);
		if (index === -1) {
			// await models.user.create({ fullName, email, passWord });
			await models.user.create(newUser);
			// res.status(201).send("thêm user thành công");
			successCode(res, "thêm user thành công");
		} else {
			// res.status(404).send("email đã tồn tại");
			failCode(res, "email đã tồn tại");
		}
	} catch (error) {
		// res.status(500).send("error server");
		errorCode(res, "lỗi server");
	}
};

const updateFood = async (req, res) => {
	try {
		const { id } = req.params;
		const { fullName, email, passWord } = req.body;
		const newData = { fullName, email, passWord };
		const data = await models.user.findAll();
		const index = data.findIndex(user => user.email === email);
		if (index === -1) {
			await models.user.update(newData, {
				where: { userId: id }
			});
			// res.status(200).send(`cập nhật thành công user có id là ${id}`);
			successCode(res, `cập nhật thành công user có id là ${id}`);
		} else {
			// res.status(404).send("email đã tồn tại");
			failCode(res, "email đã tồn tại");
		}
	} catch (error) {
		// res.status(599).send("error server");
		errorCode(res, "lỗi server");
	}
};

const deleteFood = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await models.user.findAll();
		const index = data.findIndex(user => user.userId === +id);
		console.log(index);
		if (index !== -1) {
			await models.user.destroy({
				where: { userId: id }
			});
			// res.status(200).send(`xóa thành công user có id là ${id}`);
			successCode(res, `xóa thành công user có id là ${id}`);
		} else {
			// res.status(404).send("user không tồn tại");
			failCode(res, "user không tồn tại");
		}
	} catch (error) {
		// res.status(500).send("error server");
		errorCode(res, "lỗi server");
	}
};

module.exports = {
	getFood,
	getFoodById,
	createFood,
	updateFood,
	deleteFood
};

// *Bỏ try catch trong các controller để tìm chi tiết lỗi

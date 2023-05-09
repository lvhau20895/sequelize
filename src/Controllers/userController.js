// file quản lý các controller xử lý request & response của user

// const User = require("../Models/user"); // import class User để truy vấn dữ liệu từ CSDL = các hàm sequelize
const { Sequelize } = require("sequelize");
const { successCode, errorCode, failCode } = require("../Utils/response");
const initModels = require("../Models/init-models"); // thay vì dùng Class User thì khi sử dụng Database First sẽ dùng hàm initModels()
const sequelize = require("../Models/index"); // hàm initModels sẽ nhận vào tham số sequelize để kết nối CSDL

const models = initModels(sequelize);

const Op = Sequelize.Op; // để tìm kiếm gần giống cần import {Sequelize} và tạo biến Op

const getUser = async (req, res) => {
	try {
		const { name, email } = req.query;
		if (name && email) {
			const data = await models.user.findAll({
				// where: {
				// 	fullName: name, // fullName khai báo giống bên Models
				// 	email
				// } // <=> SELECT * FROM user WHERE full_name = "" & email = "";
				where: {
					fullName: {
						[Op.like]: `%${name}%`
					},
					email
				} // <=> SELECT * FROM user WHERE full_name = "" & email = "";
			});
			console.log(data);
			// res.status(200).send(data); // thông thường sẽ trả về json có statusCode, message, data
			if (data.length > 0) {
				successCode(
					res,
					"lấy danh sách user theo tên và email thành công",
					data
				);
			} else {
				failCode(res, "không tìm thấy user");
			}
		} else {
			const data = await models.user.findAll(); // <=> SELECT * FROM user;
			// res.status(200).send(data);
			successCode(res, "lấy danh sách user thành công", data);
		}
	} catch (error) {
		// res.status(500).send("error server");
		// res.status(500).send("error server - " + error);
		errorCode(res, "lỗi server");
	}
};

const getUserById = async (req, res) => {
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

const getUserPagination = async (req, res) => {
	try {
		const { page, size } = req.query;

		const index = (page - 1) * size;

		let data = await models.user.findAll({
			offset: index, // vị trí bát đầu lấy
			limit: +size // số lượng cần lấy
		});

		successCode(res, `lấy dữ liệu trang ${page} thành công`, data);
	} catch (error) {
		errorCode(res, "error sever");
	}
};

const getTotalCountUser = async (req, res) => {
	try {
		const data = await models.user.count();
		successCode(res, "lấy số lượng user thành công", data);
	} catch (error) {
		errorCode(res, "error server");
	}
};

const createUser = async (req, res) => {
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

const updateUser = async (req, res) => {
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

const deleteUser = async (req, res) => {
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
	getUser,
	getUserById,
	getUserPagination,
	getTotalCountUser,
	createUser,
	updateUser,
	deleteUser
};

// *Bỏ try catch trong các controller để tìm chi tiết lỗi

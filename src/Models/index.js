// file kết nối CSDL

const chalk = require("chalk");
const { Sequelize } = require("sequelize");
const config = require("../Configs/config");

// tạo đối tượng sequelize từ lớp đối tượng Sequelize
// Sequelize nhận vào 5 tham số là ("tên database, tên tài khoản quản trị MySQL, mật khẩu, {host: 127.0.0.1 or localhost, port MySQL: 3306 or "3306", hệ CSDL}")
const sequelize = new Sequelize(
	config.db_database,
	config.db_user,
	config.db_pass,
	{
		host: config.db_host,
		port: config.db_port,
		dialect: config.db_dialect
	}
);

module.exports = sequelize;

// kiểm tra kết nối với database (xóa nếu không cần thiết)
try {
	sequelize.authenticate();
	console.log(chalk.greenBright("Connect Database Success"));
} catch (error) {
	console.log("Connect Database Error");
}
// chạy lệnh sau để check: node src/Models/index.js

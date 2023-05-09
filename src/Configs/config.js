// file biến môi trườngs
// lưu trữ tất cả các dữ liệu theo dạng hằng số (const) và ít khi bị thay đổi
// có sẵn đối tượng process khi cài nodejs lưu các biến môi trường

/*
	tạo file .env => enviroment để lưu trữ các biến môi trường
	tạo các biến môi trường
	cài thư viện dotenv => yarn add dotenv
	import dotenv gọi tới hàm config() để lưu các biến môi trường
*/

require("dotenv").config();

module.exports = {
	db_host: process.env.DB_HOST,
	db_user: process.env.DB_USER,
	db_pass: process.env.DB_PASS,
	db_database: process.env.DB_DATABASE,
	db_port: process.env.DB_PORT,
	db_dialect: process.env.DB_DIALECT
};

// node src/Configs/config.js => câu lệnh kiểm tra
// console.log(process);
// kiểm tra tất cả các biến
// console.log(process.env);
// kiểm tra nhanh 1 biến đã thêm thành công
// console.log(process.env.DB_DATABASE);

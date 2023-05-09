// import các thư viện theo commonjs
const express = require("express");
const cors = require("cors");
const router = require("./Routers/rootRouter");

const app = express(); // tạo app
const port = 2008; // tạo port

app.use(express.json()); // chuyển đổi dữ liệu từ body thành JSON
app.use(cors()); // cho phép FE kết nối BE
app.use("/api", router); // kết nối và sử dụng rootRouter

app.get("/", (req, res) => {
	res.send("Hello world!!!");
});

app.listen(port); // lắng nghe port

// swagger
/*
    cài đặt: yarn add swagger-ui-express swagger-jsdoc
    truy cập http://localhost:8080/swagger
    tạo file src/Swagger/index.js => copy phần comment swagger đưa vào file này => load lại trang sẽ có 2 api
    
    *Các thuộc tính chính của parameters trong Swagger bao gồm:
    - name: Tên của tham số.
    - in: Vị trí của tham số trong yêu cầu API, bao gồm các giá trị: query, path, header, body.
    - description: Mô tả cho tham số.
    - required: Xác định xem tham số có bắt buộc hay không. Giá trị mặc định là false.
    - type: Kiểu dữ liệu của tham số.
    - format: Định dạng của tham số.
    - default: Giá trị mặc định cho tham số.
    - enum: Một mảng các giá trị có thể cho tham số.
    - schema: Cấu trúc của tham số được định nghĩa bằng JSON Schema.
    - properties: định nghĩa các thuộc tính của đối tượng (object) trong API
        + type: định nghĩa kiểu dữ liệu của thuộc tính
        + description: mô tả cho thuộc tính
        + example: cung cấp một ví dụ giá trị của thuộc tính
*/
const swaggerUi = require("swagger-ui-express"); // hiển thị giao diện ui
const swaggerJsDoc = require("swagger-jsdoc"); // custom config

const options = {
	definition: {
		// thêm mô tả ở phần đầu trang
		info: {
			title: "api",
			version: "1.0.100.???",
			description: "hello swagger"
		}
	},
	apis: ["src/swagger/index.js"] // đường dẫn tới phần comment swagger
};

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs)); // có thể thay đổi đường dẫn để truy cập

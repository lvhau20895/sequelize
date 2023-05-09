// file custom status code và dữ liệu trả về

const successCode = (res, message, data = "") => {
	res.status(200).json({
		statusCode: 200,
		message,
		data
	});
};

const failCode = (res, message) => {
	res.status(400).json({
		statusCode: 400,
		message
	});
};

const errorCode = (res, message) => {
	res.status(500).json({
		statusCode: 500,
		message
	});
};

module.exports = {
	successCode,
	failCode,
	errorCode
};

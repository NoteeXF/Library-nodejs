const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-access-token");
	if (!token)
		return res
			.status(400)
			.send({ message: "Access denied, no token provided." });

	jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
		if (err) {
			return res.status(400).send({ message: "invalid token" });
		} else {
			req.userId = validToken;
			next();
		}
	});
};

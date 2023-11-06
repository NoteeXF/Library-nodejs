const{ User } = require("../model/user")

const auth = async (req,res) => {
    try {
        const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ name: req.body.name });
        if (!user)
        return res.status(401).send({ message: "Invalid Name or Password" });

        const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Name or Password" });
        
        const token = jwt.sign({ _id: user._id }, "rahasia-rahasia"); // Ganti "rahasia-rahasia" dengan rahasia yang aman

        // Kirim token ke klien
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    auth
}


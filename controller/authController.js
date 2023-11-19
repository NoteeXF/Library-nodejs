const{ User } = require("../model/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = async (req, res) => {
    try {

        const user = await User.findOne({ 

            where:{
                name: req.body.name 
            }

            });

        if (!user)
            return res.status(401).send({ message: "Invalid Name or Password" });

        const validPassword = await bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).send({ accessToken: null, message: "Invalid  Password" });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWTPRIVATEKEY,
            { expiresIn: "7d" }
        );

        return res.status(200).send({
          id: user.id,
          accessToken: token
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Internal Server Error" });
    }
};


module.exports = {
    auth,
}


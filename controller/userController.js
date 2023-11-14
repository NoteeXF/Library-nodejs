const { User } = require("../model/user");



const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = new User ({
            name,
            password
        })

        await user.save();
        res.status(201).json(user)
    } catch (error) {
        console.error("Terjadi kesalahan saat membuat produk:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat membuat user" });
    }
}

const getAllUser = async (req,res) => {
    try {
        const users =  await User.findAll()
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ error:"Terjadi kesalahan saat menampilkan user"})
    }
   
}

module.exports = {
    createUser,
    getAllUser,
}
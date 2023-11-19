const { User } = require("../model/user");
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
        // Cek apakah nama pengguna sudah ada
        const sameUser = await User.findOne({
            where: {
                name: req.body.name
            }
        });
        if (sameUser) {
            return res.status(404).json({ sameUser });
        }
        
        if (sameUser) {
            return res.status(404).json({ message: "Nama pengguna sudah ada" });
        }

        
        // Generate salt dan hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Buat objek User baru
        const newUser = await User.create({
            name: req.body.name,
            password: hashPassword,
        });

        res.status(201).json({  newUser });
    } catch (error) {
        console.error("Terjadi kesalahan saat membuat user:", error);
        res.status(500).json({ error: "Terjadi kesalahan saat membuat user" });
    }
};


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
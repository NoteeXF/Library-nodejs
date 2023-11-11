const {  DataTypes } = require("sequelize");
const db = require("../config/DB");

const User = db.define('user',{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pinalti_end:{
        type:DataTypes.DATE,
        allownull: true
    }

},{
   freezeTableName: true 
});

// Sinkronkan model dengan database
(async () => {
    try {
      await User.sync(); // Membuat tabel jika belum ada
      console.log("Tabel User berhasil disinkronkan.");
    } catch (error) {
      console.error("Terjadi kesalahan saat mensinkronkan tabel User:", error);
    }
  })();

module.exports = {
    User,
};
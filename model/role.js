const {DataTypes} = Sequelize;
const db = require("../config/DB");

const Role = db.define('role',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
   freezeTableName: true 
});

// Sinkronkan model dengan database
(async () => {
    try {
      await Product.sync(); // Membuat tabel jika belum ada
      console.log("Tabel role berhasil disinkronkan.");
    } catch (error) {
      console.error("Terjadi kesalahan saat mensinkronkan tabel User:", error);
    }
  })();

module.exports = {
    Role,
};
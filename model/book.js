const {  DataTypes } = require("sequelize");
const db = require("../config/DB");


const Books = db.define('book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING, // Menggunakan DataTypes.STRING untuk nama penulis
        allowNull: false
    },
    publisher: {
        type: DataTypes.STRING, // Perbaikan pada nama atribut publisher
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// Sinkronkan model dengan database
(async () => {
    try {
        await Books.sync(); // Membuat tabel jika belum ada
        console.log("Tabel Books berhasil disinkronkan."); // Memperbaiki pesan
    } catch (error) {
        console.error("Terjadi kesalahan saat mensinkronkan tabel Books:", error);
    }
})();

module.exports = {
    Books,
};

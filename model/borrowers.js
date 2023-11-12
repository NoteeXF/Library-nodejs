const {  DataTypes } = require('sequelize');
const db = require("../config/DB");
const { User } = require("../model/user");
const { Books } = require("../model/book");


const Borrower = db.define('Borrower', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Jika Anda ingin memastikan bahwa setiap Borrower memiliki userId yang valid
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Jika Anda ingin memastikan bahwa setiap Borrower memiliki userId yang valid
  },

  borrowedDate: DataTypes.DATE,
  dueDate: DataTypes.DATE,
  return_Date: DataTypes.DATE
  // Anda dapat menambahkan atribut lainnya seperti tanggal pengembalian, status, dll.
});

// Sinkronkan model dengan database
(async () => {
  try {
    await Borrower.sync(); // Membuat tabel jika belum ada
    console.log("Tabel Borrowers berhasil disinkronkan.");
  } catch (error) {
    console.error("Terjadi kesalahan saat mensinkronkan tabel Borrowers:", error);
  }
})();

Borrower.belongsTo(User, {
  foreignKey: 'userId',
});

Books.hasMany(Borrower, {
  foreignKey: 'bookId',
});

module.exports = {
  Borrower,
};

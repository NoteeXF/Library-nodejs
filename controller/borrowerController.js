const Borrower = require('../model/borrowers'); // Impor model Borrower
const User = require('../model/user');
const Book = require('../model/book');


// ...

// Contoh penggunaan untuk membuat peminjaman
// userId adalah ID pengguna yang meminjam
// bookId adalah ID buku yang akan dipinjam
const pinjam = async (req, res) => {
  const { userId } = req.body; // Anggap userId dan bookId dikirimkan dalam body permintaan
  const { bookId } = req.params.id;

  try {
    // Periksa apakah pengguna dengan userId tertentu ada
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (user) {
      // Buat entri baru dalam tabel Borrower
      const borrower = await Borrower.save({
        
        userId: userId,
        bookId: bookId,
        borrowedDate: new Date(),
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), 

      });

    if( book.Stock == 0 ){
      res.status(404).json ({ message:"buku tidak tersedia"});
    }

    

    
     
    } else {
      console.log(`Pengguna dengan ID ${userId} tidak ditemukan.`);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
    res.status(500).json({ error: 'Terjadi kesalahan saat meminjam buku.' });
  }
};



const returnBooks = async(req,res) => {

  const { bookId } = req.params;
  
  try {
    const book = await Book.findByPk(bookId)
    if(!book){
      return res.status(404).json({ error: 'Buku tidak ditemukan'});
    }

    book.stock++
    await book.save();


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  returnBooks,
  daftarpinjam,

}
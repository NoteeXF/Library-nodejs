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

    if (!user) {
      return res.status(404).json({ message:`nama dengan ID ${userId} tidak ada`});
    }

    if (!book) {
      return res.status(404).json({ message: `buku dengan ID ${bookId} tidak ada`});
    }
    
    if ( book.Stock == 0 ){
      return res.status(404).json ({ message:"buku tidak tersedia"});
    };

    const pinaltiend = new Date (userId.pinalti.getTime() + 3 * 24 * 60 * 60 * 1000);
  
    if ( pinaltiend.getTime() > new Date()){
      return res.status(404).json ({ message: "masih mendapat hukuman"})
    }

    const borrowedcount = Borrower.count({
      where: { userId: userId }
    });

    if( borrowedcount >= 1) {
      return res.status(400).json ({ message: "Pengguna hanya boleh meminjam 1 buku"})
    }
    const borrowedDate = new Date()
    const dueDate = new Date(borrowedDate.getTime() + 7 * 24 * 60 * 60 * 1000)

    book.stock--

    const borrower = await Borrower.save({
      userId:userId,
      bookId:bookId,
      borrowedDate:borrowedDate,
      dueDate: dueDate,
      status: "belum dikembalikan"
    })

    console.log(`buku telah dipinjam ${userId.name}`);
    res.status(201).json ({ borrower })

  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
    res.status(500).json({ error: 'Terjadi kesalahan saat meminjam buku.' });
  }
}



const returnBooks = async(req,res) => {

    const { userId }  = req.body;
    const { bookId } = req.params

  try {

    const user = await User.findByPk(userId);
    const book = await Book.Books.findByPk(bookId);

    if (!user) {
      return res.status(404).json({ message:`nama dengan ID ${userId} tidak ada`});
    }

    if (!book) {
      return res.status(404).json({ message: `buku dengan ID ${bookId} tidak ada`});
    }

    const borrower = await Borrower.findOne({
      where: {
        userId:userId,
        bookId:bookId,
        returnDate:Borrower.dueDate,
        status:Borrower.status,
      }
    })

    if (!borrower){
      return res.status(404).json({ message:"pengguna belum meminjam buku"});
    }






  } catch (error) {
    
  }

}
module.exports = {
  returnBooks,
  daftarpinjam,
  pinjam,
}
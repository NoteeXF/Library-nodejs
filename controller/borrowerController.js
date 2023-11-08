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
    
    if( book.Stock == 0 ){
      return res.status(404).json ({ message:"buku tidak tersedia"});
    };

    if( userId.pinalti  ){
      const pinaltiend = new Date (userId.pinalti.getTime() + 3 * 24 * 60 * 60 * 1000),
    };

    if( pinaltiend.getTime() >  )
    const borrowedcount = Borrower.count({
      where: { userId: userId }
    });

    if( borrowedcount >= 1) {
      return res.status(400).json ({ message: "Pengguna hanya boleh meminjam 1 buku"})
    }

    const borrower = await Borrower.create({
      userId:userId,
      bookId:bookId,
      borrowedDate:new Date(),
      dueDate:new Date (new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    })

    console.log(`buku telah dipinjam ${userId.name}`);
    res.status(201).json ({ borrower })

  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
    res.status(500).json({ error: 'Terjadi kesalahan saat meminjam buku.' });
  }
}



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
  pinjam,
}
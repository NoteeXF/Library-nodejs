const { Borrower } = require('../model/borrowers'); // Impor model Borrower
const { User } = require('../model/user');
const { Books } = require('../model/book');


// ...

// Contoh penggunaan untuk membuat peminjaman
// userId adalah ID pengguna yang meminjam
// bookId adalah ID buku yang akan dipinjam
const pinjam = async (req, res) => {
  const { userId } = req.body; // Anggap userId dan bookId dikirimkan dalam body permintaan
  const { bookId } = req.params.id;

  try {
    // Periksa apakah pengguna dengan userId tertentu ada
    const user = await User.findOne(userId);
    const book = await Books.findOne(bookId);

    if (!user) {
      return res.status(404).json({ message:"nama  tidak ada" });
    }

    if (!book) {
      return res.status(404).json({ message: "buku tidak ada" });
    }
    
    if ( book.stock === 0 ){
      return res.status(404).json ({ message:"buku tidak tersedia"});
    };

    if(user.pinalti_end){
      const pinaltiend = new Date (user.pinalti_end.getTime() + 3 * 24 * 60 * 60 * 1000);

      if ( pinaltiend.getTime() > borrowedDate.getTime()){
        return res.status(404).json ({ message: "masih mendapat hukuman"})
      }
    }
    

    if( Borrower.userId.length >= 1) {
      return res.status(400).json ({ message: "Pengguna hanya boleh meminjam 1 buku"})
    }

    const borrowedDate = new Date();
    const dueDate = new Date (borrowedDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const borrower = new Borrower({
      userId:User.id,
      bookId:book.id,
      borrowedDate:borrowedDate,
      dueDate: dueDate,
      return_Date: dueDate,
  });

    await borrower.save();
    book.stock--

    console.log(`buku telah dipinjam ${user}`);
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
        status:Borrower.status,
      }
    })

    if (!borrower){
      return res.status(404).json({ message:"pengguna belum meminjam buku"});
    }

    const returnDate = new Date()
    const dueDate = Borrower.dueDate
    const currentDate = new Date()


    if (returnDate > dueDate){

      const timeDiff = returnDate - dueDate

      const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      timeDiff -= diffInDays * (1000 * 60 * 60 * 24);
      const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
      timeDiff -= diffInHours * (1000 * 60 * 60);
      const diffInMinutes = Math.floor(timeDiff / (1000 * 60));
      timeDiff -= diffInMinutes * (1000 * 60);
      const diffInSeconds = Math.floor(timeDiff / 1000);

      console.log(`Buku dikembalikan oleh ${user.name} terlambat selama ${diffInDays} hari, ${diffInHours} jam, ${diffInMinutes} menit, ${diffInSeconds} detik. Pengguna dilarang meminjam buku selama 3 hari kedepan.`);

      const currentDateWithPenalty = new Date(currentDate.getTime() + (3 * 24 * 60 * 60 * 1000));
      user.pinalti_end = currentDateWithPenalty;
      await User.save();
      

      res.status(400).json({message: `Pengembalian terlambat selama ${diffInDays} hari, ${diffInHours} jam, ${diffInMinutes} menit, ${diffInSeconds} detik. Pengguna dilarang meminjam buku selama 3 hari kedepan.` });
    } else {

      borrower.return_Date = returnDate;
      await borrower.save();

      book.stock++
    }

    res.status(200).json({ message: "buku berhasil dikembalikan"})
  } catch (error) {

    console.error("Terjadi kesalahan saat pengembalian buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat pengembalian buku" });

  }

}
module.exports = {
  returnBooks,
  pinjam,
}
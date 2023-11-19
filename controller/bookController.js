const { Books } = require("../model/book")


const createBooks = async (req, res) => {
    try {
        const { title, author, publisher, img, stock } = req.body;
        const book = new Books({
            title,
            author,
            publisher,
            img,
            stock
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
       
        res.status(500).json({ error: "Terjadi kesalahan saat membuat produk" });
    }
}

const getAllBooks = async(req,res) => {
    try {
        const books = await Books.findAll()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ error:"Terjadi kesalahan saat menampilkan buku" });
    }
}

const getAllBooksById = async (req,res) => {

    try {
        const bookId = req.params.id
        const book = await Books.findByPk(bookId)
        if(book){
            res.json(book);
        }else{
            res.status(404).json({ message:"Buku Tidak Ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ error:"Terjadi kesalahan saat menampilkan buku" });
    }
}

const deletebook = async (req, res) => {
    try {
        const bookId = parseInt (req.params.id)
         await Books.destroy({
            where : { id:bookId }
        })
         res.status(200).json({ message:"Buku berhasil dihapus" })
        
    } catch (error) {
        res.status(500).json({error:"Terjadi kesalahan saat menghapus buku"})
    }
}


const updatebook = async (req, res) => {
    try {
        const payload = req.body;
        const id = parseInt(req.params.id);


        const book = await Books.update({
            title: payload.title,
            author: payload.author,
            publisher: payload.publisher,
            img: payload.img,
            stock: payload.stock
        }, {
            where: { id: id }
        });

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const favoritBook = async (req, res) => {
    try {
  
      let resMessage = "";
  
      const book = await Books.findByPk(req.params.id)
  
      if(!book) {
        return res.status(404).json( { message: "buku tidak ada" } )
      }
  
      const user = await User.findByPk(req.user.id)
      const index = user.favorit.indexOf(book)
      if( index == -1) {
        user.favorit.push(book);
        resMessage = "ditambahkan di favorite";
            
      } else {
        user.favorit.splice(index, 1);
        resMessage = "hapus dari favorite";
      }
  
      await user.save()
      res.status(200).json({ message:resMessage })
  
  
  
      
    } catch (error) {
      
    }
  }

module.exports = {
    createBooks,
    getAllBooks,
    getAllBooksById,
    deletebook,
    updatebook,
    favoritBook
}
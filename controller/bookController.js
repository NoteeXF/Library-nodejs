const { Books } = require("../model/book")


const createBooks = async (req, res) => {
    try {
        const { title, author, publisher, img, Stock } = req.body;
        const book = new Books({
            title,
            author,
            publisher,
            img,
            Stock
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error("Terjadi kesalahan saat membuat produk:", error);
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

module.exports = {
    createBooks,
    getAllBooks,
    getAllBooksById,
}
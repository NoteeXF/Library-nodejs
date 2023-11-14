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
         await this.Books.delete(bookId)
         res.status(200).json({ message:"Buku berhasil dihapus" })
        
    } catch (error) {
        res.status(500).json({error:"Terjadi kesalahan saat menghapus buku"})
    }
}

const  update = async (req, res) => {
    try {
        const payload = req.body;
        const id = parseInt(req.params.id);
        const book = await this.Books.update({
            where: { id: id },
            data: {
                title: payload.title,
                author: payload.author,
                publisher: payload.publisher,
                img: payload.img,
                stock: payload.stock
            }
        });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooks,
    getAllBooks,
    getAllBooksById,
    deletebook,
    update
}
const express = require ('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const borrowerController = require('../controller/borrowerController')


router.post('/', bookController.createBooks);
router.get('/get', bookController.getAllBooks);
router.get('/get/:id', bookController.getAllBooksById);
router.get('/daftar',borrowerController.daftarpinjam);


module.exports = router ;

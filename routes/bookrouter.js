const express = require ('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const borrowerController = require('../controller/borrowerController')


router.post('/', bookController.createBooks);
router.get('/get', bookController.getAllBooks);
router.get('/note/:id', bookController.getAllBooksById);
router.post('/notee/pinjam/:id', borrowerController.pinjam);
router.post('/notee/:id/return', borrowerController.returnBooks);



module.exports = router ;

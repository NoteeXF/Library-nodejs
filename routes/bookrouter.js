const express = require ('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const borrowerController = require('../controller/borrowerController')
const userController = require('../controller/userController');


router.post('/', bookController.createBooks);
router.get('/get', bookController.getAllBooks);
router.get('/note/:id', bookController.getAllBooksById);
router.post('/notee/pinjam/:id', borrowerController.pinjam);
router.post('/notee/:id/return', borrowerController.returnBooks);
router.post('/user', userController.createUser);
router.get('/userall', userController.getAllUser);
router.put('/notee/update/:id', bookController.update);
router.delete('/notee/delete/:id', bookController.deletebook);



module.exports = router ;

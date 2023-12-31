const express = require ('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const borrowerController = require('../controller/borrowerController')
const userController = require('../controller/userController');
const authController = require('../controller/authController')
const Auth =  require('../middleware/user')

router.post('/', bookController.createBooks);
router.post('/login', authController.auth);
router.get('/get', bookController.getAllBooks);
router.get('/note/:id', bookController.getAllBooksById);
router.post('/notee/pinjam/:id', Auth , borrowerController.pinjam);
router.post('/notee/return/:id', borrowerController.returnBooks);
router.post('/user', userController.createUser);
router.get('/userall', userController.getAllUser);
router.put('/notee/update/:id', bookController.updatebook);
router.delete('/notee/delete/:id', bookController.deletebook);



module.exports = router ;

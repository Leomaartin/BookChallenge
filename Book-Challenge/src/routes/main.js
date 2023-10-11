const express = require('express');
const mainController = require('../controllers/main');
const usuarioLogeado = require('../middlewares/usuarioLogeado');
const verificacionAdminMiddleware=require('../middlewares/adminBlock')
const multer = require('multer');
const uploadFile=require('../middlewares/multerBook')
const validacioneLogin=require('../middlewares/validacionesLogin')
const router = express.Router();



router.use(usuarioLogeado);
router.use(verificacionAdminMiddleware);


router.get('/', mainController.home);
//Detalle
router.get('/books/detail/:id', mainController.bookDetail);
//Login
router.get('/users/login', mainController.login);
router.post('/users/login', mainController.processLogin);
router.get('/logout',  mainController.logout);


//Search
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
//Authors
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
//Register
router.get('/users/register', mainController.register);
router.post('/users/register',validacioneLogin, mainController.processRegister);


//Delete
router.get('/books/delete/:id', mainController.delete);
router.delete('/books/delete/:id', mainController.deleteProcess);
router.post('/books/delete/:id', mainController.deleteProcess);
//Edit
router.put('/books/edit/:id', uploadFile.single('cover'), mainController.processEdit);
router.get('/books/edit/:id', mainController.edit);





module.exports = router;

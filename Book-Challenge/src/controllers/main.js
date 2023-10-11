const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Book, Author, sequelize } = require('../database/models');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error))
    },
    bookDetail: async (req, res) => {
      try {
        console.log("ID del libro a buscar:", req.params.id);
        const book = await db.Book.findByPk(req.params.id, {
          include: [{ association: 'authors' }],
        });
        if (book) {
          res.render('bookDetail', { book });
        } else {
          res.status(404).send('Libro no encontrado');
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      }
    },
  
  
  
  
  
  
  
  
  

    bookSearch: (req, res) => {
      res.render('search', { books: [] });
    },
    bookSearchResult: async (req, res) => {
      try {
        const title = req.body.title; 
        const books = await db.Book.findAll({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('title')),
            'LIKE',
            `%${title.toLowerCase()}%`
          ),
          include: [
            {
              model: db.Author,
              as: 'authors',
              through: 'BooksAuthors'
            }
          ]
        });
        res.render('search', { books });
      } catch (error) {
        console.error(error);
        res.status(500).send('Error en la búsqueda de libros.');
      }
    },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  delete: async (req, res) => {
    try {
        const book = await db.Book.findByPk(req.params.id);
        if (book) {
            return res.render('deleteBook', { book });
        } else {
            return res.status(404).send("ERROR 404 NOT FOUND");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
},
deleteProcess: async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id, {
      include: [
        {
          model: db.Author,
          as: 'authors',
          through: {
            model: db.BooksAuthors,
            where: { BookId: req.params.id }
          }
        }
      ]
    });
     if (!book) {
      return res.status(404).send("ERROR 404 NOT FOUND");
    }
    await book.setAuthors([], { through: { BookId: null } });
    await book.destroy();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
},
  

  
  
  
  
  
  
  
  
  
  
  
  
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: async (req, res) => {
    try {
      const author = await db.Author.findByPk(req.params.id, {
        include: [{ association: 'books' }],
      });
      res.render('authorBooks', { author });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  register: (req, res) => {
    res.render('register');
  },
  processRegister:async (req, res) => {
    const resultValidation = validationResult(req);
   if (resultValidation.errors.length>0){
     return res.render('register',{
       errors: resultValidation.mapped(),
       oldData: req.body,
     });
   }else{
   try{
       await db.User.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        pass: bcryptjs.hashSync(req.body.password, 10),
        categoryId: req.body.category,
       })
   } catch (error) {
     console.log("Error :",error)
   }}
     return res.redirect("/")
   },
  

  
  login: (req, res) => {
    res.render('login', {
      isLogged: res.locals.isLogged,
      usuarioLogeado: res.locals.usuarioLogeado
    });
  },
  
  processLogin: async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: req.body.email 
        }
      });
      console.log (user)
      
      if (user) { 
        const isPasswordValid = bcryptjs.compareSync(req.body.pass, user.pass);
        console.log (isPasswordValid)
      if (isPasswordValid) {
           delete user.pass;
          
           req.session.usuarioLogeado = user;
          console.log(req.session.usuarioLogeado)
          return res.redirect('/');
        } else {
          return res.redirect('/users/login?error=pass');
        }
      } else {
        return res.redirect('/users/login?error=user');
      }
    } catch (error) {
      console.error("Error:", error);
      return res.redirect('/login?error=server');
    }
   
  },logout: (req,res)=>{
    req.session.destroy()
      return res.redirect('/');
  } ,

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  edit: async (req,res)=>{
    const searchBook = await db.Book.findByPk(req.params.id)
      try {
        if (searchBook) return res.render('editBook', { book: searchBook })
      }catch{
        return res.send("ERROR 404 NOT FOUND")
      }
  },
  processEdit:async (req,res)=>{
    const searchBook = await db.Book.findByPk(req.params.id)
    const resultValidation = validationResult(req);
  
    if (resultValidation.errors.length > 0) {
        return res.render('editBook', {
            producto: searchBook,
            errors: resultValidation.mapped(),
            
        });
    }

    if (req.file == undefined){  imagenf = req.body.cover} 
    else {  imagenf = req.file.filename  }
    console.log("Valor de imagenf:", imagenf);
    try {
      await db.Book.update({
        title: req.body.title,
        description: req.body.description,
        cover: imagenf
      },
      {
        where: { id: req.params.id }
      });
    
      console.log("Actualización exitosa");
      console.log("Valor de imagenf:", imagenf);
    
      return res.redirect("/books/detail/" + req.params.id);
    } catch (error) {
      console.error("Error en la actualización:", error);
      res.redirect("/");
    }}
};

module.exports = mainController;

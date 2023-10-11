const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override'); 
const mainRouter = require('./routes/main');
const path = require('path'); // Importa el módulo 'path'

const app = express();


const publicPath = path.resolve(__dirname, "../public");

app.use(
  session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(publicPath)); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/js'));
app.use('/', mainRouter);

app.listen(3001, () => {
  console.log('Escuchando en http://localhost:3001');
});
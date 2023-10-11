module.exports = (req, res, next) => {
  try {
    if (req.session.usuarioLogeado && req.session.usuarioLogeado.categoryId === 1) {
      // El usuario es un administrador
      res.locals.isAdmin = true;
      next();
    } else {
      res.locals.isAdmin = false;
      next(); 
    }
  } catch (error) {
    console.log(error);
  }
};
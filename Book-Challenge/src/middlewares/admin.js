module.exports = (req, res, next) => {
  try {
    if (req.session.usuarioLogeado) {
      // El usuario está logeado
      next();
    } else {
      // El usuario no está logeado, redirige a la página de inicio de sesión
      res.redirect("/users/login");
    }
  } catch (error) {
    console.log(error);
  }
};
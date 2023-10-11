const logMiddleware = (req,res,next) => {
  
    if(!req.session.usuarioLogeado){
        return res.redirect('/login')
    } else {
        next()
    }
    
}

module.exports = logMiddleware
const helpersAuth = {}

helpersAuth.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }

    req.flash('error', 'Authentication failed.')
    res.redirect('/login')
}

export default helpersAuth

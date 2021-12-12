import User from '../models/user.js'
import passport from 'passport'

const userController = {}

userController.renderLogInForm = (req, res) => {
    res.render('user/login')
}

userController.renderRegisterForm = (req, res) => {
    res.render('user/register')
}

userController.logIn = passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/login',
    failureFlash: true
})

userController.register = async (req, res) => {
    const errors = []
    const { name, email, password, confirmPassword } = req.body

    if(password != confirmPassword) {
        errors.push({ text: 'Passwords not match.' })
    }

    if(password < 4) {
        errors.push({ text: 'Password very small, must be more than 4 characters.' })
    }

    if(errors.length > 0) {
        res.render('user/register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        })
    } else {
        // Searching email concidences
        const emailUser = await User.findOne({ email: email })

        if(emailUser) {
            req.flash('failure', 'Email is alredy in use.');
            res.redirect('/register')
        } else {
            const newUser = new User({ name, email, password })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success', 'Now you are registered.');
            res.redirect('/login')
            console.log(req.body)
        }
    }
}

userController.logOut = (req, res) => {
    req.logout()
    req.flash('success', 'You logged out successfully.')
    res.redirect('/login')
}

export default userController

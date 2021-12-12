import express from 'express'
const router = express.Router();
import userController from '../controllers/userController.js'

router.get('/login', userController.renderLogInForm)
router.get('/register', userController.renderRegisterForm)
router.post('/login/access', userController.logIn)
router.post('/register/save', userController.register)
router.get('/logout', userController.logOut)

export default router

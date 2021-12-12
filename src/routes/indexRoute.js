import express from 'express'
import indexController from '../controllers/indexController.js'
const router = express.Router()

router.get('/', indexController.renderIndex)
router.get('/about', indexController.renderAbout)

export default router

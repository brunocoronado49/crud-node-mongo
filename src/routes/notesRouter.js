import express from 'express'
import notesController from '../controllers/notesController.js'
import helpersAuth from '../helpers/auth.js'
const router = express.Router()

router.get('/notes', helpersAuth.isAuth, notesController.renderAllNotes)
router.get('/notes/createNotes', helpersAuth.isAuth, notesController.renderAddNotesForm)
router.get('/notes/editNotes/:id', helpersAuth.isAuth, notesController.renderEditNotesFrom)
router.post('/notes/save', helpersAuth.isAuth, notesController.saveNotes)
router.put('/notes/update/:id', helpersAuth.isAuth, notesController.updateNotes)
router.delete('/notes/delete/:id', helpersAuth.isAuth, notesController.deleteNotes)

export default router

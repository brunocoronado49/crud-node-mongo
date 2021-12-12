import Notes from '../models/notes.js'

const notesController = {}

notesController.renderAllNotes = async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .lean()
    
    res.render('notes/notes', { notes: notes})
}

notesController.renderAddNotesForm = (req, res) => {
    res.render('notes/createNotes')
}

notesController.renderEditNotesFrom = async (req, res) => {
    const notes = await Notes.findById(req.params.id).lean()

    if(notes.user != req.user.id) {
        req.flash('error', 'Do not have access.')
        return res.redirect('/notes')
    }

    res.render('notes/editNotes', { notes: notes })
}

notesController.saveNotes = async (req, res) => {
    const { title, description } = req.body
    const errors = []

    if(!title) {
        errors.push({ text: 'Please, enter a title.' })
    }

    if(!description) {
        errors.push({ text: 'Please, enter a description.' })
    }

    if(errors.length > 0) {
        res.render('notes/createNotes', {
            errors: errors,
            title: title,
            description: description
        })
    } else {
        const newNotes = new Notes({ title, description })
        newNotes.user = req.user.id
        newNotes.save()
        req.flash('success', 'Note created successfully.')
        res.redirect('/notes')
    }
}

notesController.updateNotes = async (req, res) => {
    const { title, description } = req.body
    await Notes.findByIdAndUpdate(req.params.id, { title, description})
    req.flash('success', 'Note updated successfully.')
    res.redirect('/notes')
}

notesController.deleteNotes = async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id)
    req.flash('success', 'Note deleted successfully.')
    res.redirect('/notes')
}

export default notesController


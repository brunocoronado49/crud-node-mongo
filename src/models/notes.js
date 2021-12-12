import mongoose from 'mongoose'

const NotesSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
})

export default mongoose.model('Notes', NotesSchema)
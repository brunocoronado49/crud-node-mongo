import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Encrypt the password
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)

    // pass the password to a hash and salt
    return await bcrypt.hash(password, salt)
}

// Method for match teh password
UserSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)


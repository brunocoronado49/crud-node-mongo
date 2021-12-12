import User from '../models/user.js'

const admin = {}

admin.createUserAdmin = async() => {
    const userFound = User.findOne({ email: 'admin@localhost' })

    if(userFound) return

    const newUser = new User({
        username: 'admin',
        email: 'admin@localhost'
    })

    newUser.password = await newUser.encryptPassword('adminpassword')

    const admin = newUser.save()

    console.log(`Admin: ${admin}`)

}

export default admin

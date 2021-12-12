import mongoose from 'mongoose'
import config from '../config/config.js'

(async () => {
    try {
        const database = await mongoose.connect(config.MONGODB_URI, {})
        console.log(`MongoDB connected to: ${database.connection.host}`)
    } catch (error) {
        console.log(error)
    }
})();
import { config } from 'dotenv'
config()

const configuration = {
    PORT: process.env.PORT || 3000,
    MONGODB_HOST: process.env.MONGO_HOST || 'localhost',
    MONGODB_DATABASE: process.env.MONGO_DATABASE || 'TodoDB',
    MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
        process.env.MONGODB_DATABASE || "TodoDB"
    }`,
}

export default configuration


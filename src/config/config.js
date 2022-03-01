import { config } from 'dotenv'
config()

const configuration = {
    PORT: process.env.PORT || 3000,
    MONGODB_HOST: process.env.MONGODB_HOST || 'mongo:27017',
    MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'TodoDB',
    MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "mongo:27017"}/${
        process.env.MONGODB_DATABASE || "TodoDB"
    }`,
}

export default configuration


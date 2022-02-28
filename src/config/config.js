import { config } from 'dotenv'
config()

const configuration = {
    PORT: process.env.PORT || 3000,
    MONGODB_HOST: process.env.MONGODB_HOST || 'mongo',
    MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'TodoDB',
    MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "mongo"}/${
        process.env.MONGODB_DATABASE || "TodoDB"
    }`,
}

export default configuration


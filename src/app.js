import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import MongoStore from 'connect-mongo'
import morgan from 'morgan'

// Import the config
import { createAdminUser } from './lib/createAdminUser'
import config from './config/config'
import './config/passport'

// Import the routes
import indexRoute from './routes/indexRoute'
import userRoute from './routes/userRoute'
import notesRoute from './routes/noteRoute'

// Initialization
const app = express()
createAdminUser()

// Settings
app.set('port', config.PORT)
app.set(path.join(__dirname, 'views'))
app.engine(
    '.hbs',
    engine({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    })
)
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI })
}))
app.use(passport.initialize())
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.failure = req.flash('failure')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})

// Routes
app.use(indexRoute)
app.use(userRoute)
app.use(notesRoute)

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.render('404')
})

export default app





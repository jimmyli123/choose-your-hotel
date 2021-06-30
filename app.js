const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const passport = require('passport')
const connectDB = require('./config/db')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const app = express()

const PORT = 1234

// Load config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()



// Body parser - need this to use req.body
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Method override
app.use(methodOverride('_method'))


// Handlebars
app.engine('.hbs', exphbs(
    {defaultLayout: 'main', 
    extname: '.hbs'}))
app.set('view engine', '.hbs')


// To serve static files, which we need for our css file
app.use(express.static(path.join(__dirname, 'public')))

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}) // stores our session so we don't have to re-login
  }))

// Passport middleware - has to come after session
app.use(passport.initialize())
app.use(passport.session())


// routers
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
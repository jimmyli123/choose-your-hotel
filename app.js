const express = require('express')
const app = express()

const PORT = 1234

app.set('view engine', 'hbs')


// To server static files, which we need for our css file
app.use(express.static('public'))

// routers
app.use('/', require('./routes/index'))



app.listen(PORT, console.log(`Server is running on port: ${PORT}`))
const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport = require('./auth')


// Built-in body parser
app.use(express.json())
const PORT = process.env.PORT || 3000

// middleware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
  next()
}

app.use(logRequest)


app.use(passport.initialize())
const localAuth = passport.authenticate('local', { session: false })
app.get('/', (req, res) => {
  res.send('welcome to the hotel... how can we help you?')
})


// import routes
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

// use routes
app.use('/person', localAuth, personRoutes)
app.use('/menu', menuItemRoutes)




app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

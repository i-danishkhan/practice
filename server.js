const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()

// Built-in body parser
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('welcome to the hotel... how can we help you?')
})




// import routes
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

// use routes
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)




app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

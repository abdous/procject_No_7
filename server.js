const http = require('http');
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv/config')
const path = require('path')
const session = require('express-session') 

const app = express()
app.use(express.json())
app.use(bodyParser.json())

var corsOptions = {
    origin: 'https://localhost:8080'
}



// midleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session Setup 
app.use(session({   
  // It holds the secret key for session 
  secret: 'DAS_Secret_Key', 
  // Forces the session to be saved 
  // back to the session store 
  resave: true, 
  // Forces a session that is "uninitialized" 
  // to be saved to the store 
  saveUninitialized: true
}))


// served images 
app.use('/images', express.static(path.join(__dirname, 'images')))


// routers
const userAuthentification = require('./routes/userRoutes.js')
app.use('/api/users', userAuthentification)

const userPost = require('./routes/userPostRoutes.js')
app.use('/api/posts', userPost)

const comment = require('./routes/commentRoute.js')
app.use('/api/comments', comment)


// test api's



// port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} successfully`)
})
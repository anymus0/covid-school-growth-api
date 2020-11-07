const express = require('express')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const mongoose = require('mongoose')
const xss = require('xss-clean')
const port = process.env.PORT || 3000
app.use(xss())
app.use(mongoSanitize())
app.use(compression())
app.use(bodyParser.json())

// use cors in dev mode only
if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors())
}

// import and use the "/form" route
const data = require('./routes/data')
app.use('/data', data)

const start = async () => {
  try {
    // MongoDB server connection setup
    // const mongoDB = process.env.DB_URI
    // await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    // const db = mongoose.connection
    // Bind connection to error event (to get notification of connection errors)
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    console.log(`Server is listening on port ${port}`)
    app.listen(port)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()

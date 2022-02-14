// require the .env file
require('dotenv').config()

const{Db} = require('mongodb');

//mongodb connection using mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_LOCAL, {})

const db = mongoose.connection
  db.once('open', () => {
      console.log("connected")
  })
let path = require('path')
require('dotenv').config()

// Connect to the database
import mongoose from "mongoose"
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL).then(db => {
  console.log(`Connected to ${db.connections[0].name}`)
}).catch(err => {
  console.log(err)
})

//TODO
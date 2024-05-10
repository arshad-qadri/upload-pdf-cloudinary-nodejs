const express = require("express")
const connectDB = require("./config/db")
const bookRoute = require("./books/books.route")
const app = express()

// Database configuration
connectDB()

app.use(express.json())
app.use("/api/books",bookRoute)


module.exports = app
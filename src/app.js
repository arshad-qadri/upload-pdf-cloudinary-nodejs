const express = require("express")
const connectDB = require("./config/db")
const bookRoute = require("./books/books.route")
const emailRoute = require("./email/email.route")
const app = express()

// Database configuration
connectDB()

app.use(express.json())
app.use("/api/books",bookRoute)
app.use("/api/email", emailRoute)


module.exports = app
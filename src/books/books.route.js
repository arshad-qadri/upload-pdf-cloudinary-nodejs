const { createBook } = require("./books.controller")
const multer = require("multer")
const path = require("path")
const bookRoute = require("express").Router()

const upload = multer({
    dest:path.resolve(__dirname, "../../public/uploads"),
     limits:{files:3e7}
})

bookRoute.post("/create",upload.fields([{name:"pdf_url", maxCount:1}]), createBook)

module.exports = bookRoute
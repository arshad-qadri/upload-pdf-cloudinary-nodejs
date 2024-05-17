const { emailController } = require("./email.controller")
const multer = require("multer")
const emailRoute = require("express").Router()
const path = require("path")
const upload = multer({
    dest: path.join(__dirname,"../public/uploads")
})
emailRoute.post("/send",upload.fields([{name:"file",maxCount:1}]) ,emailController)


module.exports = emailRoute
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pdf_url: {
    type: String,
    required: true,
  },
});

const BookModel =  new mongoose.model("Book",bookSchema)

module.exports = BookModel

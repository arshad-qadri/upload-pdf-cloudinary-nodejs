const cloudinary = require("../config/cloudinary");
const BookModel = require("./book.schema");
const path = require("path");

exports.createBook = async (req, res) => {
  const files = req.files;
  try {
    // console.log(files);
    const fileName = files.pdf_url[0].filename;
    const filePath = path.resolve(__dirname, "../../public/uploads", fileName);
    const uploadPdf = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      filename_override: fileName,
      folder: "books",
      format: "pdf",
    });
    console.log(uploadPdf);
    const newBook = await BookModel({
      title: req.body.title,
      pdf_url: uploadPdf.url,
    });
    newBook.save();
    res.send({ message:"Uploaded successfully." });
  } catch (error) {
    console.log(error);
  }
};

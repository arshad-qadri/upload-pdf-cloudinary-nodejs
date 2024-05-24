const mongoose = require("mongoose");

const emailSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["applied", "failed"],
    },
  },
  { timestamps: true } // corrected 'timeStamp' to 'timestamps'
);

const EmailModel = mongoose.model("email", emailSchema); // corrected 'emailShcema' to 'emailSchema'

module.exports = EmailModel;

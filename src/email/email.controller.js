const nodemailer = require("nodemailer");
const moment = require("moment");
const { email_auth_user, email_auth_pass } = require("../config");
const path = require("path");
const EmailModel = require("./email.schema");
// "axios": "^0.24.0",
const sendMail = (res, mailOptions, obj) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email_auth_user,
      pass: email_auth_pass,
    },
  });
  transporter.sendMail(mailOptions, async (err, info) => {
    if (err) {
      console.log(err);
      const newEmail = await new EmailModel({ ...obj, status: "failed" });
      newEmail.save();
      return res.status(500).send({ error: err });
    }
    const newEmail = await new EmailModel(obj);
    newEmail.save();
    return res.status(200).send({ message: "Email Sent!" });
  });
};

exports.emailController = async (req, res) => {
  const { files } = req;
  const { email, subject, content } = req.body;
  if (!files?.file) {
    return res.status(400).send({ message: "File is required!" });
  }
  const file = files?.file[0];
  if (!email || !subject || !content) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  const data = await EmailModel.findOne({ email });
  if (data) {
    const currentData = moment();
    const createdDate = moment(data.createdAt);
    const daysDiff = createdDate.diff(currentData, "days");
    const days = Math.abs(daysDiff);
    if (days <= 10) {
      return res.json({
        message: `In last ${days} days you already applied !`,
      });
    }
    const filePath = path.resolve(
      __dirname,
      `../public/uploads/${file.filename}`
    );

    const mailOptions = {
      from: email_auth_user,
      to: email,
      subject,
      text: content,
      attachments: [
        {
          filename: file?.originalname,
          path: filePath,
          contentType: "application/pdf",
        },
      ],
    };
    sendMail(res, mailOptions, {
      email,
      subject,
      message: content,
      status: "applied",
    });
  } else {
    const filePath = path.resolve(
      __dirname,
      `../public/uploads/${file.filename}`
    );
    const mailOptions = {
      from: email_auth_user,
      to: email,
      subject,
      text: content,
      attachments: [
        {
          filename: file?.originalname,
          path: filePath,
          contentType: "application/pdf",
        },
      ],
    };

    sendMail(res, mailOptions, {
      email,
      subject,
      message: content,
      status: "applied",
    });
  }
};

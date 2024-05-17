const nodemailer = require("nodemailer");
const { email_auth_user, email_auth_pass } = require("../config");
const path = require("path");

exports.emailController = (req, res) => {
  const { files } = req;
  const { email, subject, content } = req.body;
  const file = files?.file[0];
  // res.send({file})

  // mail ==================>
    const filePath = path.resolve(__dirname,`../public/uploads/${file.filename}`)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 465,
    // sender: true,
    // logger: true,
    // debug: true,
    // secureConnection: true,
    auth: {
      user: email_auth_user,
      pass: email_auth_pass,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });
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

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: err });
    }
    return res.status(200).send({ message:"Email Sent!" });
  });
};

const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
  email_auth_user:process.env.EMAIL_AUTH_USER,
  email_auth_pass:process.env.EMAIL_AUTH_PASS,
};

Object.freeze(config);

module.exports = config;

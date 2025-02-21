const nodemailer = require("nodemailer");
require("dotenv").config("../.env"); // Load .env variables correctly

const transporter = nodemailer.createTransport({
  host:"smtp.gmail.com",
  port:597,
  secure:false,
    service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to: ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendEmail;

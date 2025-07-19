const nodemailer = require("nodemailer");
const getEmailTemplate = require("../public/Templates/emailTemplate"); // adjust path as needed

const sendOtp = async (email, otp) => {
  const { html, text } = getEmailTemplate(otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "Stock Sarthi",
      address: process.env.EMAIL_USER,
    },
    to: email,
    subject: "🔐 Stock Sarthi - Email Verification Code",
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = sendOtp;

const nodemailer = require("nodemailer");

const sendOtp = async(email , otp) => {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : email,
        subject : "Varification code for Stock Sarthi",
        text : `Your One time password is ${otp}`
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendOtp;
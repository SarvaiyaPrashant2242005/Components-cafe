const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendOtp");
const otpStore = require("../utils/otpstore");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    user = new UserModel({
      name,
      email,
      password: hashedPass,
    });
    await user.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    await sendOTP(email, otp);
    res.status(200).json({ status: true, message: "OTP sent" });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = otpStore[email];
    if (!record)
      return res.status(400).json({ status: false, message: "No OTP found" });

    if (Date.now() > record.expiresAt) {
      delete otpStore[email];
      return res.status(400).json({ status: false, message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ status: false, message: "Invalid OTP" });
    }

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ status: false, message: "User not found" });

    user.verified = true;
    await user.save();
    delete otpStore[email];

    const token = generateToken(user);
    res.status(200).json({ status: true, message: "Email verified", token });
  } catch (err) {
    console.error("OTP VERIFY ERROR:", err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ status: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ status: false, message: "Invalid credentials" });

    if (!user.verified)
      return res
        .status(403)
        .json({ status: false, message: "Email not verified" });

    const token = generateToken(user);
    res.status(200).json({ status: true, messege : "User Login Successuflly",token });
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { register, verifyOTP, login };

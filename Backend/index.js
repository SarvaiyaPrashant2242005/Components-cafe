const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./src/config/db.config");
dotenv.config();
const authRoutes = require("./src/routes/userRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Database Connectiong
connectDB();

app.get("/test", (req,res) => {
    res.send("Server running successfully")
})

// Apis
app.use("/user",authRoutes);

// Server
app.listen(PORT , ()=>console.log(`Server Running on port ${PORT}`));
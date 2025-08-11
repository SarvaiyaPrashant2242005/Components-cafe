const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    available: {
        type: Number,
        default: 0
    },
    issued: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    images: {
        type: [String], // array of image URLs
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

const express = require("express");
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");
const router = express.Router();

router.get("/",getProducts);
router.get("/:id", getProductById);
router.post("/new", createProduct);
router.put("/:id/update",updateProduct);
router.delete("/:id/delete", deleteProduct);

module.exports = router;
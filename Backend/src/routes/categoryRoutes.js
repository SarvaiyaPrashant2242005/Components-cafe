const express = require("express");
const { getCategory, updateCategory, deleteCategory, createCategory } = require("../controller/categoryController");
const router = express.Router();

router.get("/" , getCategory);
router.post("/new",createCategory)
router.put("/:id/update", updateCategory);
router.delete("/:id/delete", deleteCategory);

module.exports = router;

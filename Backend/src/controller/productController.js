const ProductModel = require("../models/products.model");
const qs = require("qs");
const CategoryModel = require("../models/category.model");

// API Features Helper Class
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = qs.parse(this.queryString);
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      (match) => "$" + match
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productControl = {
  // CREATE Product
 createProduct: async (req, res) => {
  try {
    const {
      productID,
      title,
      totalQuantity,
      available,
      issued,
      description,
      images,
      category // This will be the category name from the request
    } = req.body;

    if (!title || !productID || !category) {
      return res.status(400).json({
        status: false,
        message: "Product ID, title, and category are required"
      });
    }

    // Check duplicates
    const existingProduct = await ProductModel.findOne({
      $or: [{ productID }, { title: title.toLowerCase() }]
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ status: false, message: "Product already exists" });
    }

    // Find category by name
    const categoryDoc = await CategoryModel.findOne({
      name: category
    });

    if (!categoryDoc) {
      return res.status(400).json({
        status: false,
        message: "Category not found"
      });
    }

    const newProduct = new ProductModel({
      productID,
      title: title.toLowerCase(),
      totalQuantity,
      available,
      issued,
      description,
      images: images || [],
      category: categoryDoc._id // Save ObjectId instead of name
    });

    await newProduct.save();
    res
      .status(201)
      .json({ status: true, message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
},
  // READ - Get all products
  getProducts: async (req, res) => {
    try {
      const features = new ApiFeatures(ProductModel.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;

      if (products.length === 0) {
        return res
          .status(404)
          .json({ status: false, message: "No products found" });
      }

      res.status(200).json({ status: true, data: products });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  // READ - Get single product
  getProductById: async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ status: false, message: "Product not found" });
      }
      res.status(200).json({ status: true, data: product });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  // UPDATE Product
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res
          .status(404)
          .json({ status: false, message: "Product not found" });
      }

      res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: updatedProduct
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  },

  // DELETE Product
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res
          .status(404)
          .json({ status: false, message: "Product not found" });
      }

      res
        .status(200)
        .json({ status: true, message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
};

module.exports = productControl;

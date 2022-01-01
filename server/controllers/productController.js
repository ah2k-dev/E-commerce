const Product = require("../models/productModel");

//create product -admin
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
};
//get all products
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();

  res.status(200).json({ success: true, product });
};
//get product details
exports.getProductDetails = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({ success: true, product });
};
//update product -admin
exports.updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
};
//delete productt -admin
exports.deleteProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
};

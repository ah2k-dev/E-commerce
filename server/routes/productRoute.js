const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,authRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;

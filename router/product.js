const express = require("express");
const {
  newProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product");
const router = express.Router();

router.post("/", newProduct);
router.get("/", getProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;

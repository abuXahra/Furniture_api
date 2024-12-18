const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");

router.post("/new", productController.createProduct);

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProduct);

router.get("/search/:key", productController.searchProducts);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;

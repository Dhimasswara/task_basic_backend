const express = require('express');
const router  = express.Router();
const productController = require('../controller/products');
const {validateProducts} = require('../middleware/common')

router.get("/", productController.getAllProduct );
router.get("/:id", productController.getDetailProduct);
router.post("/", validateProducts, productController.createProduct);
router.put("/:id", validateProducts, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
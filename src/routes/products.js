const express = require('express');
const router  = express.Router();
const productController = require('../controller/products');
const {validateProducts} = require('../middleware/common')

const {protect} = require('../middleware/Auth');
const upload = require('../middleware/Multer');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getDetailProduct);
router.post('/', protect, upload, validateProducts, productController.createProduct);
router.put('/:id', protect, upload, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;
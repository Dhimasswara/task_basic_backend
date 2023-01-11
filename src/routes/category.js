const express = require('express');
const router  = express.Router();
const categoryController = require('../controller/category');
const {validate} = require('../middleware/common')

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getDetailCategory);
router.post("/", validate, categoryController.createCategory);
router.put("/:id", validate, categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
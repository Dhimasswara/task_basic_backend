const express = require('express');
const router  = express.Router();
const sellerController = require('../controller/seller');
const {validate} = require('../middleware/common')

router.get("/", sellerController.getAllSeller);
router.get("/:id", sellerController.getDetailSeller);
router.post("/", validate, sellerController.createSeller);
router.put("/:id", validate, sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

module.exports = router;
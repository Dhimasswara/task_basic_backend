const express = require('express');
const router  = express.Router();
const customerController = require('../controller/customer');
const {validate} = require('../middleware/common')

router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.post("/", validate, customerController.createCustomer);
router.put("/:id", validate, customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
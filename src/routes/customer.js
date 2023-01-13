const express = require('express');
const router  = express.Router();
const customerController = require('../controller/customer');
const {validateCustomers} = require('../middleware/common')

router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.post("/", validateCustomers, customerController.createCustomer);
router.put("/:id", validateCustomers, customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
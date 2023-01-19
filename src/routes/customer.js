const express = require('express');
const router  = express.Router();
const customerController = require('../controller/customer');
const {validateCustomers} = require('../middleware/common');
const {protect} = require('../middleware/Auth');

router.get("/", customerController.getAllCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.put("/:id", protect, validateCustomers, customerController.updateCustomer);
router.delete("/:id", protect, customerController.deleteCustomer);



// Authenticate
router.post("/serv/register", customerController.registerCustomer);
router.post('/serv/login', customerController.loginCustomer);
router.post('/serv/refreshtoken', customerController.refreshTokenCustomer);
router.get('/serv/profile', protect, customerController.profileCustomer);

module.exports = router;
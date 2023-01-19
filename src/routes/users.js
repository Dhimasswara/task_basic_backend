const express = require('express');
const router  = express.Router();
const userController = require('../controller/users');

router.post("/register", userController.register);


module.exports = router;
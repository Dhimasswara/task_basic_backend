const express = require('express');
const router  = express.Router();
const sellerController = require('../controller/seller');
const {protect} = require('../middleware/Auth');


router.get("/", sellerController.getAllSeller);
router.get("/:id", sellerController.getDetailSeller);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);

// Authenticated

router.post('/serv/register', sellerController.registerSeller);
router.post('/serv/login', sellerController.loginSeller);
router.post('/serv/refresh-token', sellerController.refreshToken);
router.get('/serv/profile-seller', protect, sellerController.profileSeller);


module.exports = router;
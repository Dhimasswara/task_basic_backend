
const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const CategoryRouter = require('../routes/category')
const SellerRouter = require('../routes/seller')
const CustomerRouter = require('../routes/customer')


router.use('/products', ProductRouter)
router.use('/category', CategoryRouter)
router.use('/seller', SellerRouter)
router.use('/customer', CustomerRouter)

// 

module.exports = router;
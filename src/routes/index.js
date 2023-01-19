
const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const CategoryRouter = require('../routes/category')
const SellerRouter = require('../routes/seller')
const CustomerRouter = require('../routes/customer')
const UserRouter = require('../routes/users')


router.use('/products', ProductRouter)
router.use('/category', CategoryRouter)
router.use('/seller', SellerRouter)
router.use('/customer', CustomerRouter)
router.use('/users', UserRouter)

module.exports = router;
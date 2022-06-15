const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const providerRouter = require('./providerRouter')
const supplyRouter = require('./supplyRouter')


router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/provider', providerRouter)
router.use('/supply', supplyRouter)

module.exports = router

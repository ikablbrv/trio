const Router = require('express')
const router = new Router()

const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', productController.create)
router.post('/update', productController.update)
router.post('/delete', productController.delete)
router.get('/get', productController.getAll)
router.get('/getCategory', productController.getCategory)

module.exports = router

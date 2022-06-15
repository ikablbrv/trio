const Router = require('express')
const router = new Router()

const providerController = require('../controllers/providerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', providerController.create)
router.post('/delete', providerController.delete)
router.post('/edit', providerController.edit)
router.get('/get', providerController.getAll)
router.get('/get:id', providerController.getOne)

module.exports = router

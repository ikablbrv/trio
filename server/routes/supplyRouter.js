const Router = require('express')
const router = new Router()

const supplyController = require('../controllers/supplyController')

router.post('/create', supplyController.create)
router.post('/update', supplyController.update)
router.post('/delete', supplyController.delete)
router.get('/get', supplyController.getAll)
router.post('/getOtchet', supplyController.getOtchet)

module.exports = router

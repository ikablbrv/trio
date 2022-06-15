const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

router.post('/createStaff', userController.createStaff)
router.post('/updateStaff', userController.updateStaff)
router.post('/deleteStaff', userController.deleteStaff)
router.post('/createClient', userController.createClient)
router.post('/updateClient', userController.updateClient)
router.post('/deleteClient', userController.deleteClient)

router.get('/getStaff', userController.getStaff)
router.get('/getUsers', userController.getUsers)

module.exports = router

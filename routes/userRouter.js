const Router = require('express')
const { user } = require('pg/lib/defaults')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/olymps', authMiddleware, userController.olymps)
router.get('/olymp/status', authMiddleware, userController.olympStatus)
router.get('/olymp/tasks', authMiddleware, userController.tasks)
router.post('/olymp/task/push', authMiddleware, userController.push)
router.get('/olymp/task/status', authMiddleware, userController.taskStatus)


module.exports = router
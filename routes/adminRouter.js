const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/login', adminController.login)
router.get('/auth', adminMiddleware, adminController.check)
router.post('/olymp/create', adminMiddleware, adminController.createOlymp)
router.get('/olymps', adminMiddleware, adminController.getOlymps)
router.post('/olymp/settask', adminMiddleware, adminController.setTask)
router.get('/olymp/tasks',  adminMiddleware, adminController.getTasks)
router.post('/olymp/task/settest', adminMiddleware, adminController.test)
router.post('/olymp/start', adminMiddleware, adminController.start)
router.get('/olymp/status', adminMiddleware, adminController.status)

module.exports = router
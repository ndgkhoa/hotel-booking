import {
    loginValidation,
    registerValidation,
} from '../middlewares/validationMiddleware'
import verifyToken from '../middlewares/auth'

const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.post('/register', registerValidation, AuthController.register)
router.post('/login', loginValidation, AuthController.login)
router.get('/check-token', verifyToken, AuthController.verifyToken)
router.post('/logout', AuthController.logout)

export default router

import { Router } from 'express'
import userAuth from '../middleware/userAuth.js'
import * as UserController from '../controllers/UserController.js'

const router = Router()

router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)

export default router

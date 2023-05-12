import { Router } from "express"
import * as dogsCtrl from '../controllers/dogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, dogsCtrl.create)


export { router }
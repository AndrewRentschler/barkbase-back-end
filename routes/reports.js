import { Router } from 'express'
import * as reportsCtrl from '../controllers/reports.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)



export { router }
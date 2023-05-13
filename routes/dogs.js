import { Router } from "express"
import * as dogsCtrl from '../controllers/dogs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, dogsCtrl.create)
router.get('/', checkAuth, dogsCtrl.index)
router.get('/:dogId', checkAuth, dogsCtrl.show)
router.put('/:dogId', checkAuth, dogsCtrl.update)
router.delete('/:dogId', checkAuth, dogsCtrl.delete)


export { router }
import { Router } from 'express'
import * as reportsCtrl from '../controllers/reports.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, reportsCtrl.create)
router.get('/', checkAuth, reportsCtrl.index)
router.get('/:reportId', checkAuth, reportsCtrl.show)
router.put('/:reportId', checkAuth, reportsCtrl.update)
router.delete('/:reportId', checkAuth, reportsCtrl.delete)
router.post('/:reportId/comments', checkAuth, reportsCtrl.createComment)
router.put('/:reportId/comments/:commentId', checkAuth, reportsCtrl.updateComment)
router.delete('/:reportId/comments/:commentId', checkAuth, reportsCtrl.deleteComment)

export { router }
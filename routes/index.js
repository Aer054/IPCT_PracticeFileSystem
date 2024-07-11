const Router = require('express')
const router = new Router()
const authRouter= require('./authRouter')
const folderRouter=require('./folederRouter')
const fileRouter=require('./fileRouter')
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs related to user operations
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Route to handle user authentication and registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Successfully authenticated or registered
 */
router.use('/user',authRouter)
router.use('/folder',authMiddleware,folderRouter)
router.use('/file',authMiddleware,fileRouter)
module.exports=router
const Router = require('express')
const router = new Router()
const authRouter= require('./authRouter')
const folderRouter=require('./folderRouter')
const fileRouter=require('./fileRouter')
const authMiddleware = require('../middleware/authMiddleware');


router.use('/user',authRouter)
router.use('/folder',authMiddleware,folderRouter)
router.use('/file',authMiddleware,fileRouter)
module.exports=router
const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const userRouter = require('./userRouter')
const messagesRouter = require('./messagesRouter')

router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/messages', messagesRouter)


module.exports = router
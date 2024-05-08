const Router = require('express')
const router = new Router()
const messagesController = require('../controllers/messagesController')

router.post('/getUsersMessages', messagesController.getUsersMessages)
router.post('/addUserMessage', messagesController.addUserMessage)
router.post('/getUserDialogs', messagesController.getUserDialogs)


module.exports = router
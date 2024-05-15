const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const messagesRouter = require("./messagesRouter");

router.use("/user", userRouter);
router.use("/messages", messagesRouter);

module.exports = router;

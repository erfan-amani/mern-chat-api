const messageRouter = require("express").Router();
const messageController = require("../controllers/message");

messageRouter.get("/", messageController.getMessagesOfRoom);

module.exports = messageRouter;

const roomRouter = require("express").Router();
const roomController = require("../controllers/room");

roomRouter.get("/", roomController.getRoom);
roomRouter.post("/", roomController.createRoom);

module.exports = roomRouter;

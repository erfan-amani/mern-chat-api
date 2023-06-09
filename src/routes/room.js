const roomRouter = require("express").Router();
const roomController = require("../controllers/room");

roomRouter.get("/", roomController.getRoom);
roomRouter.post("/", roomController.createRoom);
roomRouter.get("/exist", roomController.hasRoom);

module.exports = roomRouter;

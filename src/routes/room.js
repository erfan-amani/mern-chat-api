const roomRouter = require("express").Router();
const roomController = require("../controllers/room");
const { apiAuth } = require("../middlewares/auth");

roomRouter.get("/", apiAuth, roomController.getRoom);
roomRouter.get("/active", apiAuth, roomController.activeRooms);
roomRouter.post("/", apiAuth, roomController.createRoom);

module.exports = roomRouter;

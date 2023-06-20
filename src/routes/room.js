const roomRouter = require("express").Router();
const roomController = require("../controllers/room");
const { apiAuth } = require("../middlewares/auth");

roomRouter.get("/", apiAuth, roomController.getRoom);
roomRouter.get("/all", apiAuth, roomController.getAllRooms);
roomRouter.get("/active", apiAuth, roomController.activeRooms);

module.exports = roomRouter;

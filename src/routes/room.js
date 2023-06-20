const roomRouter = require("express").Router();
const roomController = require("../controllers/room");
const { apiAuth } = require("../middlewares/auth");

roomRouter.get("/", apiAuth, roomController.getOneRoom);
roomRouter.get("/all", apiAuth, roomController.getAllRooms);
roomRouter.get("/active", apiAuth, roomController.activeRooms);
roomRouter.get("/users", apiAuth, roomController.getRoomUsers);
roomRouter.post("/contact", apiAuth, roomController.sendContactRequest);
roomRouter.post(
  "/contact/accept",
  apiAuth,
  roomController.acceptContactRequest
);
roomRouter.get("/contact/sent", apiAuth, roomController.getSentContactRequests);
roomRouter.get(
  "/contact/received",
  apiAuth,
  roomController.getReceivedContactRequests
);
roomRouter.delete("/contact/:id", apiAuth, roomController.rejectContactRequest);

module.exports = roomRouter;

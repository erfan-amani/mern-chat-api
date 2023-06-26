const roomRouter = require("express").Router();
const roomController = require("../controllers/room");
const { apiAuth } = require("../middlewares/auth");
const pagination = require("../middlewares/pagination");

roomRouter.get("/", apiAuth, roomController.getOneRoom);
roomRouter.get("/all", apiAuth, pagination, roomController.getAllRooms);
roomRouter.get("/active", apiAuth, pagination, roomController.activeRooms);
roomRouter.get("/users", apiAuth, roomController.getRoomUsers);
roomRouter.post(
  "/contact",
  apiAuth,
  pagination,
  roomController.sendContactRequest
);
roomRouter.post(
  "/contact/accept",
  apiAuth,
  roomController.acceptContactRequest
);
roomRouter.get(
  "/contact/sent",
  apiAuth,
  pagination,
  roomController.getSentContactRequests
);
roomRouter.get(
  "/contact/received",
  apiAuth,
  pagination,
  roomController.getReceivedContactRequests
);
roomRouter.delete("/contact/:id", apiAuth, roomController.rejectContactRequest);

module.exports = roomRouter;

const notificationRouter = require("express").Router();
const notificationController = require("../controllers/notification");
const { apiAuth } = require("../middlewares/auth");

notificationRouter.get("/", apiAuth, notificationController.getAll);
notificationRouter.get("/readAll", apiAuth, notificationController.readAll);
notificationRouter.get(
  "/:id",
  apiAuth,
  notificationController.getAndReadNotification
);

module.exports = notificationRouter;

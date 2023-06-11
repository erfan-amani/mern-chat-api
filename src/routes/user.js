const userRouter = require("express").Router();

const { apiAuth } = require("../middlewares/auth");
const userController = require("../controllers/user");

userRouter.get("/profile", apiAuth, userController.getProfile);
userRouter.get("/my-rooms", apiAuth, userController.getUserRooms);
userRouter.get("/logout", apiAuth, userController.logout);
userRouter.get("/:id", apiAuth, userController.getUserData);

module.exports = userRouter;

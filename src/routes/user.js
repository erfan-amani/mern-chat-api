const userRouter = require("express").Router();

const { apiAuth } = require("../middlewares/auth");
const userController = require("../controllers/user");

userRouter.get("/profile", apiAuth, userController.getProfile);
userRouter.get("/:id", apiAuth, userController.getUserData);

module.exports = userRouter;

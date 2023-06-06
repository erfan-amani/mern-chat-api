const userRouter = require("express").Router();

const userAuth = require("../middlewares/auth");
const userController = require("../controllers/user");

userRouter.get("/profile", userAuth, userController.getProfile);

module.exports = userRouter;

const authRouter = require("express").Router();

const authController = require("../controllers/auth");

authRouter.post("/register", authController.register);

module.exports = authRouter;

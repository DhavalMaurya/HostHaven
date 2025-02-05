const express = require("express");
const { login, signIn, resetPasswordToken, resetPassword } = require("../controllers/Auth")
const authRouter = express.Router();
const upload = require("../utils/multerFile")

authRouter.post("/sign-in", upload.single('profile_picture'), signIn);
authRouter.post("/login", login);
authRouter.post("/reset-password-token" , resetPasswordToken);
authRouter.post("/reset-password" , resetPassword);

module.exports = authRouter


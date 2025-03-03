const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const { updateProfileController } = require("../controllers/userController");
// const { loginController, registerController, logoutController } = require("../controllers/authControllers");
const UserRouter = express.Router();

UserRouter.put("/update-profile-pic" ,jwtAuth , updateProfileController)

module.exports = UserRouter;
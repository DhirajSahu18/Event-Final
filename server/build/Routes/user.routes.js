"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_controller_1 = require("../Controllers/User.controller");
const getUserInfo_middleware_1 = __importDefault(require("../Middlewares/getUserInfo.middleware"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/signup", User_controller_1.signUpController);
router.post("/login", User_controller_1.loginController);
router.get("/logout", User_controller_1.logoutController);
router.get("/me", getUserInfo_middleware_1.default, User_controller_1.getUserInfoController);
exports.default = router;

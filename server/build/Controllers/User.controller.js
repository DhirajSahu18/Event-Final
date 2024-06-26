"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.getUserInfoController = exports.signUpController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userSchema = zod_1.z.object({
            name: zod_1.z.string().min(2).max(20),
            email: zod_1.z.string().email().max(50),
            password: zod_1.z.string().min(6).max(20),
        });
        const validation = userSchema.safeParse({
            name,
            email,
            password,
        });
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid Input",
                error: validation.error.message,
            });
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });
        user.save();
        res.status(200).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Signup Error : ", error === null || error === void 0 ? void 0 : error.message);
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.signUpController = signUpController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userSchema = zod_1.z.object({
            email: zod_1.z.string().email().max(50),
            password: zod_1.z.string().min(6).max(20),
        });
        const validation = userSchema.safeParse({
            email,
            password,
        });
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid Input",
                error: validation.error.message,
            });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET);
        res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600000,
            secure: true,
        })
            .json({
            message: "Login Successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Login Error : ", error === null || error === void 0 ? void 0 : error.message);
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.loginController = loginController;
const getUserInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        user: req.user,
    });
});
exports.getUserInfoController = getUserInfoController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.json({
        message: "Logged out successfully",
    });
});
exports.logoutController = logoutController;

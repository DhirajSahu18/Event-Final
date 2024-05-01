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
exports.multerUpload = exports.uploadOnCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: 'dvwxhfqn4',
    api_key: '288927926433832',
    api_secret: 'O2MMcFTVU7uPzZMEZwc4ZV0sNO8'
});
// Function to upload file to Cloudinary
const uploadOnCloudinary = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!filePath) {
            return null;
        }
        const response = yield cloudinary_1.v2.uploader.upload(filePath, { resource_type: 'auto' });
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(filePath);
        return null;
    }
});
exports.uploadOnCloudinary = uploadOnCloudinary;
// Multer disk storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// Multer upload configuration
const multerUpload = (0, multer_1.default)({ storage });
exports.multerUpload = multerUpload;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modular Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Express Setup
const app = (0, express_1.default)();
// Configuration and Middlewares
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
// Database connection
const db_js_1 = __importDefault(require("./db.js"));
(0, db_js_1.default)();
// Routes imports
const user_routes_js_1 = __importDefault(require("./Routes/user.routes.js"));
// Middleware Routes
app.use("/user", user_routes_js_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});
const port = Number(process.env.PORT) || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const token_1 = require("../middlewares/token");
const authRouter = express_1.default.Router();
authRouter.get("/", token_1.token_verify, authController_1.userAuthenticated);
authRouter.post("/login", authController_1.authentication);
authRouter.get("/permitLogin", authController_1.permitLogin);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map
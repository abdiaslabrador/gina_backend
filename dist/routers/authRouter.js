"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const token_1 = require("../middlewares/token");
const authRouter = express_1.default.Router();
authRouter.get("/", token_1.token_verify, authController_1.userAuthenticated);
authRouter.post("/login", [
    (0, express_validator_1.check)("email", "Error al escribir el email").isEmail(),
    (0, express_validator_1.check)("password", "Tienen que ser más de 6 caracteres").isLength({ min: 6 }),
], authController_1.authentication);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map
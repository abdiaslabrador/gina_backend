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
authRouter.post("/login", [
    (0, express_validator_1.check)("email", { message: "Email mal escrito" }).isEmail(),
    (0, express_validator_1.check)("password", { message: "Tiene que tener más de 6 caráteres" }).isLength({ min: 6 }),
], authController_1.authentication);
authRouter.get("/", token_1.token_verify, authController_1.userAuthenticated);
authRouter.get("/permitLogin", authController_1.permitLogin);
authRouter.get("/delete-token", authController_1.deleteTokenCookie);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map
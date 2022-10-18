"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token_verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign, decode, verify } = jsonwebtoken_1.default;
function token_verify(req, res, next) {
    /**
     * verficamos que el string que viene en el header sea un token
     */
    let user = {};
    const { token } = req.cookies;
    if (token) {
        try {
            user = verify(token, process.env.SECRETKEY);
        }
        catch (error) {
            res.clearCookie('token');
            next({ name: "JsonWebTokenError", msg: "token no válido" });
        }
        req.user = user.user;
        return next(); //importante colocar el retun para hacer el cambio al otro middleware
    }
    next({ name: "JsonWebTokenError", msg: "No hay token" });
}
exports.token_verify = token_verify;
//# sourceMappingURL=token.js.map
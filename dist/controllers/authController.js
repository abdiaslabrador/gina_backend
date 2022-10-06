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
exports.userAuthenticated = exports.authentication = void 0;
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const validators_1 = require("../helpers/validators");
const { sign, decode, verify } = jsonwebtoken_1.default;
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let errorObject = (0, validators_1.entriesValidatorHelper)(req);
    if (errorObject)
        return next(errorObject);
    const { email, password } = req.body;
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository
            .createQueryBuilder("user")
            // .select(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
            .select(["user.id", "user.name", "user.last_name", "user.birthday", "user.password"])
            // .from(User,"user")
            .where("user.email = :email", { email: email })
            .getOne();
        if (user) {
            let equal_pass = yield bcrypt_1.default.compare(password, user.password);
            if (equal_pass) {
                delete user.password;
                const token = sign(JSON.stringify({
                    user: user
                }), process.env.SECRETKEY);
                return res.status(200).json(token);
            }
            else {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }
        }
        ;
        return res.status(400).json({ msg: "Email no encontrado" }); //contenido no encontrado
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.authentication = authentication;
const userAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository
            .createQueryBuilder("user")
            .select(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
            // .from(User,"user")
            .where("user.id = :id", { id: req.user.id })
            .getOne();
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(401).json({ msg: "No untenticado" }); //contenido no encontrado
        }
    }
    catch (error) {
        console.log(error);
        return next(error);
    }
});
exports.userAuthenticated = userAuthenticated;
//# sourceMappingURL=authController.js.map
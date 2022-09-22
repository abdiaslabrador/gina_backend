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
require("dotenv").config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("./data-source");
const User_1 = require("./entities/User");
const Photo_1 = require("./entities/Photo");
const app = (0, express_1.default)();
const { sign, decode, verify } = jsonwebtoken_1.default;
const saltRounds = 10;
function token_verify(req, res, next) {
    /**
     * verficamos que el string que viene en el header sea un token
     */
    let bearerToken;
    const bearerheader = req.headers['authorization'];
    bearerToken = bearerheader ? bearerheader.split(" ")[1] : null;
    if (bearerheader != "undefined" && bearerheader != null) {
        req.token = bearerToken;
        verify(req.token, process.env.secretkey);
    }
    next();
}
function errorHandler(error, req, res, next) {
    let errorHandler = {
        JsonWebTokenError: (resp, message) => { res.status(403).json({ msj: "Error de token" }); },
        default: (resp) => { res.status(500).json({ msj: `Error en el servidor` }); }
    };
    let handler = errorHandler[error.name] || errorHandler.default;
    handler(res);
}
//middleware
app.use(express_1.default.json());
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const appDataSource = yield (0, data_source_1.getDataSource)();
    app.get("/api/photos", token_verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const photoRepository = data_source_1.AppDataSource.getRepository(Photo_1.Photo);
        const photos = yield photoRepository.createQueryBuilder("photos").getMany();
        if (photos.length > 0) {
            return res.status(200).json(photos);
        }
        else {
            return res.status(200).json({ msj: "No hay fotos" }); //contenido no encontrado
        }
    }));
    app.post("/api/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository
            .createQueryBuilder("user")
            // .addSelect(["user.id", "user.name", "user.last_name", "user.ci_rif", "user.sex", "user.birthday", "user.ci_rif_optional", "user.phone_number", "user.direccion", "user.email", "user.active", "user.secretario", "user.superuser", "user.createdAt", "user.updateAt"])
            // .from(User,"user")
            .where("user.email = :email", { email: email })
            .getOne();
        if (user) {
            let result = yield bcrypt_1.default.compare(password, user.password);
            if (result) {
                const token = sign(JSON.stringify({
                    name: user.name,
                    last_name: user.last_name,
                    birthday: user.birthday
                }), process.env.secretkey);
                return res.status(200).json(token);
            }
        }
        ;
        return res.status(204); //contenido no encontrado
    }));
    app.use(errorHandler);
    app.listen(3000, function () {
        console.log("server running in port 3000");
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=server.js.map
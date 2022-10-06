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
const cors = require('cors');
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("./data-source");
const Photo_1 = require("./entities/Photo");
const errorHandler_1 = require("./middlewares/errorHandler");
const token_1 = require("./middlewares/token");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
//middleware
app.use(cors());
app.use(express_1.default.json());
app.use('/api/auth', authRouter_1.default);
const { sign, decode, verify } = jsonwebtoken_1.default;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const appDataSource = yield (0, data_source_1.getDataSource)();
    app.get("/api/photos", token_1.token_verify, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const photoRepository = data_source_1.AppDataSource.getRepository(Photo_1.Photo);
            const photos = yield photoRepository.createQueryBuilder("photos").getMany();
            if (photos.length > 0) {
                return res.status(200).json(photos);
            }
            else {
                return res.status(200).json({ msj: "No hay fotos" }); //contenido no encontrado
            }
        }
        catch (error) {
            next(error);
        }
    }));
    app.use(errorHandler_1.handleErrors);
    app.listen(PORT, function () {
        console.log(`server running in port ${PORT}`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=server.js.map
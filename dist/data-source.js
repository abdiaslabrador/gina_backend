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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "gina_database",
    synchronize: false,
    logging: false,
    entities: ["dist/entities/**/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
});
const getDataSource = () => {
    if (exports.AppDataSource.isInitialized) {
        console.log("ya fue inicializado");
        return Promise.resolve(exports.AppDataSource);
    }
    return new Promise((resolve, reject) => {
        exports.AppDataSource.initialize()
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            // console.log("se hizo una conexión nueva")
            resolve(exports.AppDataSource);
        }))
            .catch((error) => reject(error));
    });
};
exports.getDataSource = getDataSource;
// export const getDataSource = (delay = 3000): Promise<DataSource> => {
//   if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (AppDataSource.isInitialized) resolve(AppDataSource);
//       else reject("Failed to create connection with database");
//     }, delay);
//   });
// };
//# sourceMappingURL=data-source.js.map
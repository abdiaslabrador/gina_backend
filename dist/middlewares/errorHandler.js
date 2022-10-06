"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
function handleErrors(error, req, res, next) {
    let errorHandler = {
        expressValidator: (resp) => {
            let errors = [];
            if (error["errors"]) {
                errors = error["errors"];
            }
            res.status(403).json({ type: error.name, errors: errors });
        },
        JsonWebTokenError: (resp) => {
            error["msg"] ? "" : (error["msg"] = "Error de token");
            res.status(403).json({ type: error.name, msg: error["msg"] });
        },
        default: (resp) => {
            res.status(500).json({ type: "500", msg: "Error en el servidor" });
        },
    };
    let handler = errorHandler[error.name] || errorHandler.default;
    handler(res);
}
exports.handleErrors = handleErrors;
//# sourceMappingURL=errorHandler.js.map
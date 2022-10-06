"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entriesValidatorHelper = void 0;
const express_validator_1 = require("express-validator");
function entriesValidatorHelper(req) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return { name: "expressValidator", errors: errors.array() };
    }
    else {
        return null;
    }
}
exports.entriesValidatorHelper = entriesValidatorHelper;
//# sourceMappingURL=validators.js.map
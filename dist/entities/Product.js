"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const typeorm_1 = require("typeorm");
let Producto = class Producto extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Producto.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Producto.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric",
        precision: 12,
        scale: 2
    }),
    __metadata("design:type", Number)
], Producto.prototype, "bs_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric",
        precision: 12,
        scale: 2
    }),
    __metadata("design:type", Number)
], Producto.prototype, "ds_price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Producto.prototype, "cant", void 0);
Producto = __decorate([
    (0, typeorm_1.Entity)()
], Producto);
exports.Producto = Producto;
//# sourceMappingURL=Product.js.map
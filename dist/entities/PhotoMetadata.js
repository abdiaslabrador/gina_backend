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
exports.PhotoMetadata = void 0;
const typeorm_1 = require("typeorm");
const Photo_1 = require("./Photo");
let PhotoMetadata = class PhotoMetadata {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PhotoMetadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], PhotoMetadata.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], PhotoMetadata.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PhotoMetadata.prototype, "orientation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], PhotoMetadata.prototype, "compressed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PhotoMetadata.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Photo_1.Photo, (photo) => photo.metadata),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Photo_1.Photo)
], PhotoMetadata.prototype, "photo", void 0);
PhotoMetadata = __decorate([
    (0, typeorm_1.Entity)()
], PhotoMetadata);
exports.PhotoMetadata = PhotoMetadata;
//# sourceMappingURL=PhotoMetadata.js.map
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
exports.Photo = void 0;
const typeorm_1 = require("typeorm");
const Author_1 = require("./Author");
const PhotoMetadata_1 = require("./PhotoMetadata");
const Album_1 = require("./Album");
let Photo = class Photo {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
    }),
    __metadata("design:type", String)
], Photo.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Photo.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "numeric",
        precision: 12,
        scale: 2
    }),
    __metadata("design:type", Number)
], Photo.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Photo.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PhotoMetadata_1.PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
        cascade: true,
    }),
    __metadata("design:type", PhotoMetadata_1.PhotoMetadata)
], Photo.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Author_1.Author, (author) => author.photos, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Author_1.Author)
], Photo.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Album_1.Album, (album) => album.photos, { cascade: true, }),
    __metadata("design:type", Array)
], Photo.prototype, "albums", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Photo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Photo.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Photo.prototype, "deleteAt", void 0);
Photo = __decorate([
    (0, typeorm_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map
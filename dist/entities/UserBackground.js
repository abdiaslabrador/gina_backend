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
exports.UserBackground = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let UserBackground = class UserBackground {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserBackground.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text") //reacción medicamentosa
    ,
    __metadata("design:type", String)
], UserBackground.prototype, "rm", void 0);
__decorate([
    (0, typeorm_1.Column)("text") //antecedentes patológicos personales
    ,
    __metadata("design:type", String)
], UserBackground.prototype, "app", void 0);
__decorate([
    (0, typeorm_1.Column)("text") //antecedentes hemorágicos
    ,
    __metadata("design:type", String)
], UserBackground.prototype, "ah", void 0);
__decorate([
    (0, typeorm_1.Column)("text") //antecedentes patológicos familiares
    ,
    __metadata("design:type", String)
], UserBackground.prototype, "apf", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], UserBackground.prototype, "habitos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], UserBackground.prototype, "need_child_edentigrama", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.userbackground),
    __metadata("design:type", User_1.User)
], UserBackground.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserBackground.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserBackground.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date
    // @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
    //     cascade: true,
    // })
    )
], UserBackground.prototype, "deleteAt", void 0);
UserBackground = __decorate([
    (0, typeorm_1.Entity)()
], UserBackground);
exports.UserBackground = UserBackground;
//# sourceMappingURL=UserBackground.js.map
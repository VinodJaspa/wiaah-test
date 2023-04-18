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
exports.GqlAuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("../constants");
const knownError_1 = require("../Errors/knownError");
class AuthorizationRequired extends knownError_1.KnownError {
    constructor(msg) {
        super(msg, knownError_1.PublicErrorCodes.unAuthorized);
    }
}
let GqlAuthorizationGuard = class GqlAuthorizationGuard {
    constructor(roles) {
        this.roles = [];
        this.roles = [...roles];
    }
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const user = ctx.getContext().user;
        console.log("user", { user });
        const isPublic = this.roles.includes(constants_1.accountType.PUBLIC);
        if (!user || typeof user !== "object" || typeof user.id !== "string") {
            if (isPublic) {
                return true;
            }
            else {
                throw new AuthorizationRequired("this account can not preform this actionawjdhkja");
            }
        }
        if (this.roles) {
            if (this.roles.length === 0)
                return true;
            if (!user.accountType || !this.roles.includes(user.accountType)) {
                throw new AuthorizationRequired("this account can not preform this action1324654");
            }
        }
        else {
            return false;
        }
        console.log("checking with user");
        return !!user;
    }
};
GqlAuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], GqlAuthorizationGuard);
exports.GqlAuthorizationGuard = GqlAuthorizationGuard;
//# sourceMappingURL=AuthorizationGuard.js.map
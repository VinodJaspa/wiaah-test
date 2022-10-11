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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const constants_1 = require("./constants");
let UploadService = class UploadService {
    constructor(options, httpService) {
        this.options = options;
        this.httpService = httpService;
        this.logger = new common_1.Logger("UploadService");
        this.serviceProvider = this.options.provider;
        this.serviceKey = this.options.serviceKey;
        this.secretKey = this.options.secretKey;
    }
    async uploadFiles(files, userId) {
        const sortedFiles = files.reduce((acc, curr) => {
            const fileType = "";
            const newAcc = Object.assign({}, acc);
            newAcc[fileType] = [...acc[fileType], curr];
            return newAcc;
        }, {});
    }
    async uploadImages(images, userId) {
        switch (this.serviceProvider) {
            case constants_1.UploadServiceProviders.CLOUDFLARE:
                return this.uploadCloudFlareImages(images);
            default:
                this.logger.error("incorrect upload service provider");
                throw new common_1.InternalServerErrorException();
        }
    }
    async uploadVideos(videoFile) { }
    async uploadCloudFlareImages(imageFile) {
        return true;
    }
    async uploadCloudFlareVideos(videoFile) { }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("options")),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map
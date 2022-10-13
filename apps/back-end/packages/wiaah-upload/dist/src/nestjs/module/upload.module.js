"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const upload_service_1 = require("./upload.service");
let UploadModule = UploadModule_1 = class UploadModule {
    static forRoot(options) {
        return {
            module: UploadModule_1,
            providers: [
                upload_service_1.UploadService,
                {
                    provide: "options",
                    useValue: options,
                },
            ],
            imports: [
                axios_1.HttpModule.register({
                    maxRedirects: 5,
                }),
                config_1.ConfigModule.forRoot(),
            ],
            exports: [upload_service_1.UploadService],
        };
    }
};
UploadModule = UploadModule_1 = __decorate([
    (0, common_1.Module)({})
], UploadModule);
exports.UploadModule = UploadModule;
//# sourceMappingURL=upload.module.js.map
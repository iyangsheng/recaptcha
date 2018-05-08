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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const captcha_service_1 = require("../service/captcha.service");
const exception_interceptor_1 = require("../interceptor/exception.interceptor");
let CaptchaResolver = class CaptchaResolver {
    constructor(captchaService) {
        this.captchaService = captchaService;
        this.SECRET_V2 = "6Lcjb1UUAAAAANYm0u0Qj16VX2_MgpUcTyhkUtFt";
        this.SECRET_INVISIBLE = "6Ldv91YUAAAAAN6ssl51uuX4ZcaoS74scyce3RfA";
    }
    recaptchaV2(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verifyCode } = body;
            if (!verifyCode) {
                throw new common_1.HttpException("缺少必要的参数", 406);
            }
            const recaptchaResult = yield this.captchaService.reCaptcha(this.SECRET_V2, verifyCode);
            return { code: 200, message: "获取验证结果成功", captchaResult: recaptchaResult };
        });
    }
    recaptchaInvisible(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { verifyCode } = body;
            if (!verifyCode) {
                throw new common_1.HttpException("缺少必要的参数", 406);
            }
            const recaptchaResult = yield this.captchaService.reCaptcha(this.SECRET_INVISIBLE, verifyCode);
            return { code: 200, message: "获取验证结果成功", captchaResult: recaptchaResult };
        });
    }
};
__decorate([
    graphql_1.Query("recaptchaV2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaptchaResolver.prototype, "recaptchaV2", null);
__decorate([
    graphql_1.Query("recaptchaInvisible"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CaptchaResolver.prototype, "recaptchaInvisible", null);
CaptchaResolver = __decorate([
    graphql_1.Resolver("captcha"),
    common_1.UseInterceptors(exception_interceptor_1.ExceptionInterceptor),
    __param(0, common_1.Inject(captcha_service_1.CaptchaService)),
    __metadata("design:paramtypes", [captcha_service_1.CaptchaService])
], CaptchaResolver);
exports.CaptchaResolver = CaptchaResolver;
//# sourceMappingURL=captcha.resolver.js.map
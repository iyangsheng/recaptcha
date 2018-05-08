"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const common_1 = require("@nestjs/common");
const iconv_lite_1 = require("iconv-lite");
const request_1 = require("request");
let CaptchaService = class CaptchaService {
    reCaptcha(secret, verifyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const postUrl = "https://recaptcha.net/recaptcha/api/siteverify?secret=" + secret + "&response=" + verifyCode;
            let captchaResult = {};
            let ex = "";
            yield new Promise((ok, no) => {
                request_1.post(postUrl, { encoding: undefined }, (err, res, body) => {
                    if (err) {
                        ex = new common_1.HttpException("网络错误" + err.toString(), 404);
                        ok();
                        return;
                    }
                    else {
                        const str = iconv_lite_1.decode(body, "GBK").toString();
                        const result = JSON.parse(str);
                        captchaResult = {
                            success: result.success,
                            challengeTs: result.challenge_ts,
                            hostname: result.hostname,
                            errorCodes: result["error-codes"],
                        };
                        ok();
                        return;
                    }
                });
            });
            if (ex) {
                throw ex;
            }
            else {
                return captchaResult;
            }
        });
    }
};
CaptchaService = __decorate([
    common_1.Component()
], CaptchaService);
exports.CaptchaService = CaptchaService;
//# sourceMappingURL=captcha.service.js.map
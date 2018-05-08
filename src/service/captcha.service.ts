import { Component, HttpException } from "@nestjs/common";
import { decode } from "iconv-lite";
import { post } from "request";
import { CaptchaResult } from "../interface/captcha.data";

@Component()
export class CaptchaService {

    async reCaptcha(secret: string, verifyCode: string): Promise<any> {
        const postUrl = "https://recaptcha.net/recaptcha/api/siteverify?secret=" + secret + "&response=" + verifyCode;
        let captchaResult = {};
        let ex: any = "";
        await new Promise((ok, no) => {
           post(postUrl, { encoding: undefined }, (err, res, body) => {
               if (err) {
                 ex = new HttpException("网络错误" + err.toString(), 404);
                 ok();
                 return;
               } else {
                 const str: string = decode(body, "GBK").toString();
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
        } else {
            return captchaResult;
        }
    }

}
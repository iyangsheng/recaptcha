import { Query, Resolver } from "@nestjs/graphql";
import { CaptchaData, CaptchaResult } from "../interface/captcha.data";
import { HttpException, Inject, UseInterceptors } from "@nestjs/common";
import { CaptchaService } from "../service/captcha.service";
import { ExceptionInterceptor } from "../interceptor/exception.interceptor";

@Resolver("captcha")
@UseInterceptors(ExceptionInterceptor)
export class CaptchaResolver {

    constructor(
        @Inject(CaptchaService) private readonly captchaService: CaptchaService,
    ) {}

    readonly SECRET_V2 = "6Lcjb1UUAAAAANYm0u0Qj16VX2_MgpUcTyhkUtFt";
    readonly SECRET_INVISIBLE = "6Ldv91YUAAAAAN6ssl51uuX4ZcaoS74scyce3RfA";

    /**
     * 使用"我不是机器人"复选框验证用户
     * @param req
     * @param body
     */
    @Query("recaptchaV2")
    async recaptchaV2(req, body: { verifyCode: string }): Promise<CaptchaData> {
        const { verifyCode } = body;
        if (!verifyCode) {
            throw new HttpException("缺少必要的参数", 406);
        }
        const recaptchaResult = await this.captchaService.reCaptcha(this.SECRET_V2, verifyCode);
        return {code: 200, message: "获取验证结果成功", captchaResult: recaptchaResult};
    }

    /**
     * 在后台验证用户
     * @param req
     * @param body
     */
    @Query("recaptchaInvisible")
    async recaptchaInvisible(req, body: { verifyCode: string }): Promise<CaptchaData> {
    const { verifyCode } = body;
    if (!verifyCode) {
      throw new HttpException("缺少必要的参数", 406);
    }
    const recaptchaResult = await this.captchaService.reCaptcha(this.SECRET_INVISIBLE, verifyCode);
    return {code: 200, message: "获取验证结果成功", captchaResult: recaptchaResult};
    }
}

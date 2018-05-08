import { CaptchaData } from "../interface/captcha.data";
import { CaptchaService } from "../service/captcha.service";
export declare class CaptchaResolver {
    private readonly captchaService;
    constructor(captchaService: CaptchaService);
    readonly SECRET_V2: string;
    readonly SECRET_INVISIBLE: string;
    recaptchaV2(req: any, body: {
        verifyCode: string;
    }): Promise<CaptchaData>;
    recaptchaInvisible(req: any, body: {
        verifyCode: string;
    }): Promise<CaptchaData>;
}

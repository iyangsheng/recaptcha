export interface CaptchaData {

    readonly code: number;

    readonly message: string;

    readonly captchaResult: CaptchaResult;
}

export interface CaptchaResult {
    // 验证结果
    readonly success: boolean;
    // 验证时间
    readonly challengeTs: string;
    // 域名
    readonly hostname: string;
    // 错误码
    readonly errorCodes: Array<string>;
}
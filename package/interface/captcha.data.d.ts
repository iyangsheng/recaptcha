export interface CaptchaData {
    readonly code: number;
    readonly message: string;
    readonly captchaResult: CaptchaResult;
}
export interface CaptchaResult {
    readonly success: boolean;
    readonly challengeTs: string;
    readonly hostname: string;
    readonly errorCodes: Array<string>;
}

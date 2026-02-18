/** 비즈뿌리오 메세지 계정 정보 */
export interface BizppurioMessageAccount {
    account: string;
    password: string;
    senderKey: string;
    companyTel: string;
    refKey: string;
}

export type BizppurioAccount =
    | BizppurioMessageAccount
    | BizppurioOperationAccount;

export type BizppurioAccountType = 'message' | 'operation';

/**
 * 메세지 전송
 *
 */
type BizppurioMessageType = 'at' | 'sms' | 'lms';

export interface AlimtalkContent {
    templatecode: string;
    message: string;
    button?: {
        name: string;
        type: 'WL' | 'AL'; // 웹링크 / 앱링크
        url_pc?: string;
        url_mobile?: string;
        scheme_ios?: string;
        scheme_android?: string;
    }[];
    senderkey: string;
}

export interface SmsContent {
    message: string;
}

export interface LmsContent {
    subject: string;
    message: string;
}

export interface BizppurioAlimtalkSendRequest {
    to: string;
    content: {
        at: AlimtalkContent;
    };
}

export interface BizppurioSmsSendRequest {
    to: string;
    content: {
        sms: SmsContent;
    };
}

export interface BizppurioLmsSendRequest {
    to: string;
    content: {
        lms: LmsContent;
    };
}

export interface BizppurioTokenResponse {
    type: string;
    accesstoken: string;
    expired: string;
}

export interface BizppurioSendResponse {
    code: string;
    description: string;
    messageKey: string;
    refKey: string;
}

/**
 * 운영
 */
/** 비즈뿌리오 운영 계정 정보 */
export interface BizppurioOperationAccount {
    bizId: string;
    apiKey: string;
    senderKey: string;
    senderKeyType?: BizppurioOperationSenderKeyType;
}

type BizppurioOperationSenderKeyType = 'S' | 'G';

export interface AlimtalkTemplateRequest {
    templateCode: string;
}

export interface AlimtalkTemplatesRequest {}

export interface BizppurioOperationResponse {
    code: string;
    message: string;
    data: any;
}

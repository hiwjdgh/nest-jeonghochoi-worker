/**
 * 메세지 전송
 *
 */
type BizppurioMessageType = 'at' | 'sms' | 'lms';

interface BizppurioBaseSendRequest<
    TType extends BizppurioMessageType,
    TContent,
> {
    account: string;
    type: TType;
    from: string;
    to: string;
    refkey: string;
    content: TContent;
}

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

export interface BizppurioAlimtalkSendRequest extends BizppurioBaseSendRequest<
    'at',
    { at: AlimtalkContent }
> {}

export interface BizppurioSmsSendRequest extends BizppurioBaseSendRequest<
    'sms',
    { sms: SmsContent }
> {}

export interface BizppurioLmsSendRequest extends BizppurioBaseSendRequest<
    'lms',
    { lms: LmsContent }
> {}

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
 * 코어
 *
 */

type BizppurioCoreSenderKeyType = 'S' | 'G';

export interface BizppurioCoreGetAlimtalkTemplateRequest {
    bizId: string;
    apiKey: string;
    senderKey: string;
    senderKeyType?: BizppurioCoreSenderKeyType;
    templateCode: string;
}

export interface BizppurioCoreGetAlimtalkTemplatesRequest {
    bizId: string;
    apiKey: string;
    senderKey: string;
    senderKeyType?: BizppurioCoreSenderKeyType;
}

export interface BizppurioCoreResponse {
    code: string;
    message: string;
    data: any;
}

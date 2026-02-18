/** 비즈뿌리오 메세지 */
export const bizppurioMessageBaseUrl = 'https://api.bizppurio.com';

export const bizppurioMessageUris = {
    message: {
        token: '/v1/token',
        send: '/v3/message',
    },
} as const;

export const bizppurioMessageTimeout = 10000;

/** 비즈뿌리오 운영 */
export const bizppurioOperationBaseUrl = 'https://kapi.ppurio.com';

export const bizppurioOperationUris = {
    template: '/v3/kakao/template/detail',
    templates: '/v3/kakao/template/list',
} as const;

export const bizppurioOperationTimeout = 10000;

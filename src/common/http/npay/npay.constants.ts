export const NPAY_BASE_URL = 'https://pay.paygate.naver.com';
export const NPAY_CARD_REGISTER_URI =
    '/naverpay/payments/recurrent/regist/v1/approval';
export const NPAY_CARD_UNREGISTER_URI =
    '/naverpay/payments/recurrent/expire/v1/request';
export const NPAY_PAY_RESERVE_URI =
    '/naverpay/payments/recurrent/pay/v3/reserve';
export const NPAY_PAY_URI = '/naverpay/payments/recurrent/pay/v3/approval';
export const NPAY_CANCEL_URI = '/naverpay/payments/v1/cancel';
export const NPAY_TIMEOUT = 10000;

/** 취소 요청자
 * 1: 구매자
 * 2: 가맹점 관리자
 */
export const NPAY_CANCEL_REQUESTER = {
    customer: '1',
    admin: '2',
} as const;

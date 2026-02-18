export const KICC_BASE_URL = 'https://pgapi.easypay.co.kr';
export const KICC_CARD_REGISTER_URI = '/directapi/trades/directCardApproval';
export const KICC_PAY_URI = 'directapi/trades/directCardApproval';
export const KICC_PREPAY_URI = '/directapi/trades/directPrepayApproval';
export const KICC_CANCEL_URI = '/api/trades/revise';
export const KICC_STATUS_URI = '/api/trades/retrieveTransaction';
export const KICC_TIMEOUT = 10000;

/**
 * 간편결제 처리종류 구분
 *
 * 11 : 간편결제 등록
 * 41 : 간편결제 결제
 * */
export const KICC_CARD_TXT_TYPE = {
    cardRegister: '11',
    cardPay: '41',
} as const;

/**
 * 간편결제 카드결제종류
 * 0: 일반
 */
export const KICC_CARD_REQ_TYPE = {
    normal: '0',
} as const;

/**
 * 간편결제 인증요청 구분
 *
 * 0 : 카드번호 + 유효기간 + 생년월일 + 비번2자리
 * 1 : 카드번호 + 유효기간
 * 2 : 카드번호 + 유효기간 + 생년월일
 * 3 : 카드번호 + 유효기간 해외카드 (카드번호 + 유효기간)
 * */
export const KICC_CARD_CERT_TYPE = {
    fullAuth: '0',
    defaultAuth: '1',
    cardBirthAuth: '2',
    overseaAuth: '3',
} as const;

/**
 * 간편결제 인증 사용자 구분
 *
 * 0 : 개인
 * 1 : 법인
 * */
export const KICC_CARD_USER_TYPE = {
    normal: '0',
    corp: '1',
} as const;

/**
 * 결제 취소 구분
 * 32: 부분취소
 * 40: 전체취소
 * */
export const KICC_CANCEL_TYPE = {
    partial: '32',
    full: '40',
} as const;

/**
 * 화폐 단위
 * 00: 원화
 */
export const KICC_CURRENCY = {
    won: '00',
} as const;

/**
 * 할부 개월
 * 00: 일시불
 * 02: 02개월
 * 03: 03개월
 * 04: 04개월
 * 05: 05개월
 * 06: 06개월
 * 07: 07개월
 * 08: 08개월
 * 09: 09개월
 * 10: 10개월
 * 11: 11개월
 * 12: 12개월
 * 13: 13개월
 * 14: 14개월
 * 15: 15개월
 * 16: 16개월
 * 17: 17개월
 * 18: 18개월
 * 19: 19개월
 * 20: 20개월
 * 21: 21개월
 * 22: 22개월
 * 23: 23개월
 * 24: 24개월
 * */
export const KICC_INSTALLMENT = {
    m00: '00',
    m02: '02',
    m03: '03',
    m04: '04',
    m05: '05',
    m06: '06',
    m07: '07',
    m08: '08',
    m09: '09',
    m10: '10',
    m11: '11',
    m12: '12',
    m13: '13',
    m14: '14',
    m15: '15',
    m16: '16',
    m17: '17',
    m18: '18',
    m19: '19',
    m20: '20',
    m21: '21',
    m22: '22',
    m23: '23',
    m24: '24',
} as const;

/**
 * 클라이언트 버전(2 자리) + OS 구분(2 자리)
 *
 * 클라이언트 버전(N8 : 다이렉트 PC, D8 :다이렉트 모바일)
 * OS 버전(WI : 윈도우, AN : 안드로이드, IO :ios, MA : 매킨토시, ET : 기타 OS)
 */
export const KICC_CLIENT_VERSION = {
    pc: {
        window: 'N8WI',
        android: 'N8AN',
        ios: 'N8IO',
        regacyIos: 'N8MA',
        etc: 'N8ET',
    },
    mobile: {
        window: 'D8WI',
        android: 'D8AN',
        ios: 'D8IO',
        regacyIos: 'D8MA',
        etc: 'D8ET',
    },
} as const;

/**
 * 선불 결제사
 * TMN: 티머니페이
 */
export const KICC_PREPAY_COMPANY_TYPE = {
    tmoneyPay: 'TMN',
} as const;

/**
 * 선불결제 처리종류 구분
 * 20: 승인
 */
export const KICC_PREPAY_TXT_TYPE = {
    approval: '20',
} as const;

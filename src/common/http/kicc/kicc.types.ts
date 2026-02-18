import {
    KICC_CANCEL_TYPE,
    KICC_CARD_CERT_TYPE,
    KICC_CARD_REQ_TYPE,
    KICC_CARD_TXT_TYPE,
    KICC_CARD_USER_TYPE,
    KICC_CLIENT_VERSION,
    KICC_CURRENCY,
    KICC_INSTALLMENT,
    KICC_PREPAY_COMPANY_TYPE,
    KICC_PREPAY_TXT_TYPE,
} from './kicc.constants';

/** 카드등록/결제정보 처리종류 정보 */
export type CardTxtType = keyof typeof KICC_CARD_TXT_TYPE;
export type KiccCardTxtType = (typeof KICC_CARD_TXT_TYPE)[CardTxtType];

/** 카드등록/결제정보 처리종류 정보 */
export type CardReqType = keyof typeof KICC_CARD_REQ_TYPE;
export type KiccCardReqType = (typeof KICC_CARD_REQ_TYPE)[CardReqType];

/** 카드등록정보 인증구분 정보 */
export type CardCertType = keyof typeof KICC_CARD_CERT_TYPE;
export type KiccCardCertType = (typeof KICC_CARD_CERT_TYPE)[CardCertType];

/** 카드등록정보 사용자구분 정보 */
export type CardUserType = keyof typeof KICC_CARD_USER_TYPE;
export type KiccCardUserType = (typeof KICC_CARD_USER_TYPE)[CardUserType];

/** 취소정보 취소구분 정보 */
export type CancelType = keyof typeof KICC_CANCEL_TYPE;
export type KiccCancelType = (typeof KICC_CANCEL_TYPE)[CancelType];

/** 결제정보 할부 정보 */
export type InstallmentType = keyof typeof KICC_INSTALLMENT;
export type KiccInstallment = (typeof KICC_INSTALLMENT)[InstallmentType];

/** 공통정보 화폐단위 정보 */
export type CurrencyType = keyof typeof KICC_CURRENCY;
export type KiccCurrency = (typeof KICC_CURRENCY)[CurrencyType];

/** 공통정보 요청OS 정보 */
export type DeviceType = keyof typeof KICC_CLIENT_VERSION;
export type PlatformType = keyof (typeof KICC_CLIENT_VERSION)[DeviceType];
export type KiccClientVersion =
    (typeof KICC_CLIENT_VERSION)[DeviceType][PlatformType];

/** 선불결제 요청회사 정보 */
export type PrepayCompanyType = keyof typeof KICC_PREPAY_COMPANY_TYPE;

export type KiccPrepayCompanyType =
    (typeof KICC_PREPAY_COMPANY_TYPE)[PrepayCompanyType];

/** 선불결제 처리종류 정보 */
export type PrepayType = keyof typeof KICC_PREPAY_TXT_TYPE;
export type KiccPrepayType = (typeof KICC_PREPAY_TXT_TYPE)[PrepayType];

/** 상점 정보 */
export interface KiccAccount {
    mallId: string;
    secret: string;
}

/** 공통 정보 */
export interface KiccDirectCommonInfo {
    mallId: string;
    amount: number;
    currency: KiccCurrency;
    clientVersion: KiccClientVersion;
    shopReqDate: string;
    shopTransactionId: string;
}

/** 주문 정보 */
export interface KiccDirectOrderInfo {
    shopOrderNo: string;
    customerName: string;
    customerMail: string;
    customerContactNo1: string;
    goodsName: string;
    goodsAmount: number;
}

/** 카드등록 베이스 정보 */
interface KiccDirectCardRegisterBase {
    cardTxtype: KiccCardTxtType;
    reqType: string;
    certType: KiccCardCertType;
    cardNo: string;
    expiryDate: string;
}

/** 카드등록 전체인증 정보 */
export interface KiccDirectCardRegisterCardFullAuthInfo extends KiccDirectCardRegisterBase {
    password: string;
    authValue: string;
    userType: KiccCardUserType;
}

/** 카드등록 기본인증 정보 */
export interface KiccDirectCardRegisterCardDefaultAuthInfo extends KiccDirectCardRegisterBase {}

/** 카드등록 생년인증 정보 */
export interface KiccDirectCardRegisterCardBirthAuthInfo extends KiccDirectCardRegisterBase {
    authValue: string;
    userType: KiccCardUserType;
}

/** 카드등록 해외인증 정보 */
export interface KiccDirectCardRegisterCardOverseaAuthInfo extends KiccDirectCardRegisterBase {}

/** 카드등록 정보 */
export type KiccDirectCardRegisterInfo =
    | KiccDirectCardRegisterCardFullAuthInfo
    | KiccDirectCardRegisterCardDefaultAuthInfo
    | KiccDirectCardRegisterCardBirthAuthInfo
    | KiccDirectCardRegisterCardOverseaAuthInfo;

/** 카드결제 정보 */
export interface KiccDirectCardPayInfo {
    cardTxtype: KiccCardTxtType;
    reqType: string;
    cardAmount: number;
    installmentMonth: KiccInstallment;
    cardNo: string;
}

/** 선불결제 정보 */
export interface KiccDirectPrepayInfo {
    prepayTxtype: KiccPrepayType;
    cpCode: KiccPrepayCompanyType;
    prepayAmount: number;
    authNo: string;
    cardNoE: string;
}

/** 카드등록 요청 */
export interface KiccCardRegisterRequest {
    directCommonInfo: KiccDirectCommonInfo;
    directOrderInfo: KiccDirectOrderInfo;
    directCardInfo: KiccDirectCardRegisterInfo;
}

export interface CardRegisterRequest {
    product: {
        prefix: string;
        name: string;
        amount: number;
        currency: KiccCurrency;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    card: KiccDirectCardRegisterInfo;
}

/** 카드결제 요청 */
export interface KiccPayRequest {
    directCommonInfo: KiccDirectCommonInfo;
    directOrderInfo: KiccDirectOrderInfo;
    directCardInfo: KiccDirectCardPayInfo;
}

export interface PayRequest {
    product: {
        prefix: string;
        name: string;
        amount: number;
        currency: KiccCurrency;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    card: {
        no: string;
        installment: KiccInstallment;
    };
}

/** 선불결제 요청 */
export interface KiccPrepayRequest {
    directCommonInfo: KiccDirectCommonInfo;
    directOrderInfo: KiccDirectOrderInfo;
    directPrepayInfo: KiccDirectPrepayInfo;
}

export interface PrepayRequest {
    product: {
        prefix: string;
        name: string;
        amount: number;
        currency: KiccCurrency;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    card: {
        no: string;
        company: KiccPrepayCompanyType;
    };
}

/** 전체취소 요청 */
export interface KiccCancelFullRequest {
    mallId: string;
    shopTransactionId: string;
    pgCno: string;
    amount: number;

    reviseTypeCode: KiccCancelType;
    clientIp: string;
    clientId: string;
    msgAuthValue: string;
    cancelReqDate: string;
    reviseMessage: string;
}

export interface CancelFullRequest {
    receipt: {
        pgCno: string;
        amount: number;
    };
    cancel: {
        type: string;
        reason: string;
    };
}

/** 부분취소 요청 */
export interface KiccCancelPartialRequest {
    mallId: string;
    shopTransactionId: string;
    pgCno: string;
    reviseTypeCode: KiccCancelType;
    clientIp: string;
    clientId: string;
    msgAuthValue: string;
    cancelReqDate: string;
    reviseMessage: string;
}

export interface CancelPartialRequest {
    receipt: {
        pgCno: string;
        amount: number;
    };
    cancel: {
        type: string;
        reason: string;
    };
}

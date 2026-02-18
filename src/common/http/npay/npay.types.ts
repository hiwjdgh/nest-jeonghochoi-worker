import { NPAY_CANCEL_REQUESTER } from './npay.constants';

/** 취소 요청자 정보 */
export type CancelRequester = keyof typeof NPAY_CANCEL_REQUESTER;
export type NpayCancelRequester =
    (typeof NPAY_CANCEL_REQUESTER)[CancelRequester];

export interface NpayHeader {
    'X-Naver-Client-Id': string;
    'X-Naver-Client-Secret': string;
    'X-NaverPay-Chain-Id': string;
    'X-NaverPay-Idempotency-Key'?: string;
}

export interface NpayAccount {
    clientId: string;
    secret: string;
    chainId: string;
}

export interface NpayCardRegisterRequest {
    reserveId: string;
    tempReceiptId: number;
}

export interface NpayCardUnregisterRequest {
    recurrentId: string;
}

export interface NpayPayReserveRequest {
    recurrentId: string;
    totalPayAmount: number;
    taxScopeAmount: number;
    taxExScopeAmount: number;
    productName: string;
    merchantPayId: string;
    merchantUserId: string;
}

export interface PayReserveRequest {
    product: {
        prefix: string;
        name: string;
        amount: number;
        taxScopeAmount: number;
        taxExScopeAmount: number;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    card: {
        no: string;
    };
}

export interface NpayPayRequest {
    paymentId: string;
}

export interface NpayCancelRequest {
    paymentId: string;
    cancelAmount: number;
    cancelReason: string;
    cancelRequester: NpayCancelRequester;
    taxScopeAmount: number;
    taxExScopeAmount: number;
}

export interface CancelRequest {
    receipt: {
        paymentId: string;
        amount: number;
        taxScopeAmount: number;
        taxExScopeAmount: number;
    };
    cancel: {
        type: NpayCancelRequester;
        reason: string;
    };
}

export interface NpayResponse {
    code: string;
    message: string;
    body: any;
}

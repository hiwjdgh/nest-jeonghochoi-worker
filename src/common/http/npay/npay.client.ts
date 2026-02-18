import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient, Tool } from '@jeonghochoi/core-worker';
import {
    CancelRequest,
    NpayAccount,
    NpayCancelRequest,
    NpayCardRegisterRequest,
    NpayCardUnregisterRequest,
    NpayHeader,
    NpayPayRequest,
    NpayPayReserveRequest,
    NpayResponse,
    PayReserveRequest,
} from './npay.types';
import {
    NPAY_BASE_URL,
    NPAY_CANCEL_URI,
    NPAY_CARD_REGISTER_URI,
    NPAY_CARD_UNREGISTER_URI,
    NPAY_PAY_RESERVE_URI,
    NPAY_PAY_URI,
    NPAY_TIMEOUT,
} from './npay.constants';

@Injectable()
export class NpayClient {
    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        this.http.register('npay', {
            baseURL: NPAY_BASE_URL,
            retries: 3,
            timeoutMs: NPAY_TIMEOUT,
        });
    }

    async getAccount(key: string): Promise<NpayAccount> {
        /** 또는 DB 조회 */
        return await this.config.getOrThrow<Record<string, any>>('NPAY_MALLS')[
            key
        ];
    }

    async registerCard(
        account: NpayAccount,
        payload: NpayCardRegisterRequest,
    ): Promise<NpayResponse> {
        const header = this.getHeader(account);

        const response = await this.http
            .use('npay')
            .post(NPAY_CARD_REGISTER_URI, payload, {
                headers: header as any,
            });

        return response.data;
    }

    async unregisterCard(
        account: NpayAccount,
        payload: NpayCardUnregisterRequest,
    ): Promise<NpayResponse> {
        const header = this.getHeader(account);

        const response = await this.http
            .use('npay')
            .post(
                `${NPAY_CARD_UNREGISTER_URI}?recurrentId=${payload.recurrentId}`,
                null,
                {
                    headers: header as any,
                },
            );

        return response.data;
    }

    async payReserve(
        account: NpayAccount,
        payload: PayReserveRequest,
    ): Promise<NpayResponse> {
        if (
            payload.product.amount !=
            payload.product.taxScopeAmount + payload.product.taxExScopeAmount
        ) {
            throw new Error(
                '과세 대상 금액 과 면세 대상 금액의 합이 상품 가격과 같지 않습니다.',
            );
        }

        const header = this.getHeader(account);

        const response = await this.http.use('npay').post(
            NPAY_PAY_RESERVE_URI,
            {
                recurrentId: payload.card.no,
                totalPayAmount: payload.product.amount,
                taxScopeAmount: payload.product.taxScopeAmount,
                taxExScopeAmount: payload.product.taxExScopeAmount,
                productName: payload.product.name,
                merchantPayId: this.getShopOrderNo(payload.product.prefix),
                merchantUserId: payload.customer.email,
            } as NpayPayReserveRequest,
            {
                headers: header as any,
            },
        );

        return response.data;
    }

    async pay(
        account: NpayAccount,
        payload: NpayPayRequest,
    ): Promise<NpayResponse> {
        const header = this.getHeader(account);
        const response = await this.http
            .use('npay')
            .post(NPAY_PAY_URI, payload, {
                headers: header as any,
            });

        return response.data;
    }

    async cancel(
        account: NpayAccount,
        payload: CancelRequest,
    ): Promise<NpayResponse> {
        const header = this.getHeader(account);

        const response = await this.http.use('npay').post(
            NPAY_CANCEL_URI,
            {
                paymentId: payload.receipt.paymentId,
                cancelAmount: payload.receipt.amount,
                cancelReason: payload.cancel.type,
                cancelRequester: payload.cancel.reason,
                taxScopeAmount: payload.receipt.taxScopeAmount,
                taxExScopeAmount: payload.receipt.taxExScopeAmount,
            } as NpayCancelRequest,
            {
                headers: header as any,
            },
        );

        return response.data;
    }

    private getHeader(account: NpayAccount): NpayHeader {
        return {
            'X-Naver-Client-Id': account.clientId,
            'X-Naver-Client-Secret': account.secret,
            'X-NaverPay-Chain-Id': account.chainId,
        };
    }

    getShopTransactionId(): string {
        return Tool.time.timeBasedId();
    }

    getShopOrderNo(prefix: string): string {
        return `${prefix}${this.getShopTransactionId()}`;
    }

    getShopReqDate() {
        return Tool.time.format(Date.now(), 'YYYYYMMDD');
    }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Crypto, HttpClient, Tool } from '@jeonghochoi/core-worker';
import {
    CancelFullRequest,
    CancelPartialRequest,
    CancelType,
    CardRegisterRequest,
    CardReqType,
    CardTxtType,
    CurrencyType,
    DeviceType,
    InstallmentType,
    KiccAccount,
    KiccCancelFullRequest,
    KiccCancelPartialRequest,
    KiccCancelType,
    KiccCardRegisterRequest,
    KiccCardReqType,
    KiccCardTxtType,
    KiccClientVersion,
    KiccCurrency,
    KiccInstallment,
    KiccPayRequest,
    KiccPrepayRequest,
    KiccPrepayType,
    PayRequest,
    PlatformType,
    PrepayRequest,
    PrepayType,
} from './kicc.types';
import {
    KICC_BASE_URL,
    KICC_CANCEL_TYPE,
    KICC_CANCEL_URI,
    KICC_CARD_REGISTER_URI,
    KICC_CARD_REQ_TYPE,
    KICC_CARD_TXT_TYPE,
    KICC_CLIENT_VERSION,
    KICC_CURRENCY,
    KICC_INSTALLMENT,
    KICC_PAY_URI,
    KICC_PREPAY_TXT_TYPE,
    KICC_PREPAY_URI,
    KICC_TIMEOUT,
} from './kicc.constants';

@Injectable()
export class KiccClient {
    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        this.http.register('kicc', {
            baseURL: KICC_BASE_URL,
            retries: 3,
            timeoutMs: KICC_TIMEOUT,
        });
    }

    async getAccount(key: string): Promise<KiccAccount> {
        /** 또는 DB 조회 */
        return await this.config.getOrThrow<Record<string, any>>('KICC_MALLS')[
            key
        ];
    }

    async registerCard(account: KiccAccount, payload: CardRegisterRequest) {
        const response = await this.http
            .use('kicc')
            .post(KICC_CARD_REGISTER_URI, {
                directCommonInfo: {
                    mallId: account.mallId,
                    amount: payload.product.amount,
                    currency: payload.product.currency,
                    clientVersion: this.getClientVersion('pc', 'window'),
                    shopReqDate: this.getShopReqDate(),
                    shopTransactionId: this.getShopTransactionId(),
                },
                directOrderInfo: {
                    shopOrderNo: this.getShopOrderNo(payload.product.prefix),
                    customerName: payload.customer.name,
                    customerMail: payload.customer.email,
                    customerContactNo1: payload.customer.phone,
                    goodsName: payload.product.name,
                    goodsAmount: payload.product.amount,
                },
                directCardInfo: payload.card,
            } as KiccCardRegisterRequest);

        return response.data;
    }

    async pay(account: KiccAccount, payload: PayRequest) {
        const response = await this.http.use('kicc').post(KICC_PAY_URI, {
            directCommonInfo: {
                mallId: account.mallId,
                amount: payload.product.amount,
                currency: payload.product.currency,
                clientVersion: this.getClientVersion('pc', 'window'),
                shopReqDate: this.getShopReqDate(),
                shopTransactionId: this.getShopTransactionId(),
            },
            directOrderInfo: {
                shopOrderNo: this.getShopOrderNo(payload.product.prefix),
                customerName: payload.customer.name,
                customerMail: payload.customer.email,
                customerContactNo1: payload.customer.phone,
                goodsName: payload.product.name,
                goodsAmount: payload.product.amount,
            },
            directCardInfo: {
                cardTxtype: this.getCardTxtType('cardPay'),
                reqType: this.getCardReqType('normal'),
                cardAmount: payload.product.amount,
                installmentMonth: payload.card.installment,
                cardNo: payload.card.no,
            },
        } as KiccPayRequest);

        return response.data;
    }

    async prepay(account: KiccAccount, payload: PrepayRequest) {
        const response = await this.http.use('kicc').post(KICC_PREPAY_URI, {
            directCommonInfo: {
                mallId: account.mallId,
                amount: payload.product.amount,
                currency: payload.product.currency,
                clientVersion: this.getClientVersion('pc', 'window'),
                shopReqDate: this.getShopReqDate(),
                shopTransactionId: this.getShopTransactionId(),
            },
            directOrderInfo: {
                shopOrderNo: this.getShopOrderNo(payload.product.prefix),
                customerName: payload.customer.name,
                customerMail: payload.customer.email,
                customerContactNo1: payload.customer.phone,
                goodsName: payload.product.name,
                goodsAmount: payload.product.amount,
            },
            directPrepayInfo: {
                prepayTxtype: this.getPrepayTxtType('approval'),
                cpCode: payload.card.company,
                prepayAmount: payload.product.amount,
                authNo: payload.card.no.split('|')[0],
                cardNoE: payload.card.no.split('|')[1],
            },
        } as KiccPrepayRequest);

        return response.data;
    }

    async cancelFull(account: KiccAccount, payload: CancelFullRequest) {
        const transactionId = this.getShopTransactionId();
        const response = await this.http.use('kicc').post(KICC_CANCEL_URI, {
            mallId: account.mallId,
            shopTransactionId: transactionId,
            pgCno: payload.receipt.pgCno,
            reviseTypeCode: this.getCancelType('full'),
            clientIp: 'localhost',
            clientId: 'KICC WORKER',
            msgAuthValue: this.getMsgAuthValue(
                `${payload.receipt.pgCno}|${transactionId}`,
                account.secret,
            ),
            cancelReqDate: this.getShopReqDate(),
            reviseMessage: payload.cancel.reason,
        } as KiccCancelFullRequest);

        return response.data;
    }

    async cancelPartial(account: KiccAccount, payload: CancelPartialRequest) {
        const transactionId = this.getShopTransactionId();

        const response = await this.http.use('kicc').post(KICC_CANCEL_URI, {
            mallId: account.mallId,
            shopTransactionId: transactionId,
            pgCno: payload.receipt.pgCno,
            reviseTypeCode: this.getCancelType('partial'),
            clientIp: 'localhost',
            clientId: 'KICC WORKER',
            msgAuthValue: this.getMsgAuthValue(
                `${payload.receipt.pgCno}|${transactionId}`,
                account.secret,
            ),
            cancelReqDate: this.getShopReqDate(),
            reviseMessage: payload.cancel.reason,
        } as KiccCancelPartialRequest);

        return response.data;
    }

    getClientVersion(
        device: DeviceType,
        platform: PlatformType,
    ): KiccClientVersion {
        return KICC_CLIENT_VERSION[device][platform];
    }

    getCurrency(currency: CurrencyType): KiccCurrency {
        return KICC_CURRENCY[currency];
    }

    getInstallment(installment: InstallmentType): KiccInstallment {
        return KICC_INSTALLMENT[installment];
    }

    getCardTxtType(cardTxtType: CardTxtType): KiccCardTxtType {
        return KICC_CARD_TXT_TYPE[cardTxtType];
    }

    getPrepayTxtType(prepayTxtType: PrepayType): KiccPrepayType {
        return KICC_PREPAY_TXT_TYPE[prepayTxtType];
    }

    getCardReqType(cardReqType: CardReqType): KiccCardReqType {
        return KICC_CARD_REQ_TYPE[cardReqType];
    }

    getCancelType(cancelType: CancelType): KiccCancelType {
        return KICC_CANCEL_TYPE[cancelType];
    }

    getMsgAuthValue(data: string, secret: string): string {
        return Crypto.hash.hmacSha256(data, secret, 'hex');
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

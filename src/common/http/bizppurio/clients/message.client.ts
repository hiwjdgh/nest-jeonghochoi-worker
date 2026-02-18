import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    BizppurioAlimtalkSendRequest,
    BizppurioLmsSendRequest,
    BizppurioMessageAccount,
    BizppurioSendResponse,
    BizppurioSmsSendRequest,
    BizppurioTokenResponse,
} from '../bizppurio.types';
import { Crypto, HttpClient, Tool } from '@jeonghochoi/core-worker';
import {
    bizppurioMessageBaseUrl,
    bizppurioMessageTimeout,
    bizppurioMessageUris,
} from '../bizppurio.constants';

@Injectable()
export class MessageClient {
    private readonly tokens = new Map<string, BizppurioTokenResponse>();

    private readonly refreshingMap = new Map<string, Promise<void>>();

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        this.http.register('bizppurioMessage', {
            baseURL: bizppurioMessageBaseUrl,
            retries: 3,
            timeoutMs: bizppurioMessageTimeout,
        });
    }

    async getAccount(key: string): Promise<BizppurioMessageAccount> {
        /** 또는 DB 조회 */
        return await this.config.getOrThrow<Record<string, any>>(
            'BIZPPURIO_CLIENTS',
        )[key]['message'];
    }

    private async getAccessToken(
        account: BizppurioMessageAccount,
    ): Promise<string> {
        const now = Tool.time.nowUnixMs();
        const cache = this.tokens.get(account.account);

        // ✅ 1. 캐시 존재 + 아직 유효 (1분 전까지)
        if (cache && now < Tool.time.toUnixMs(cache.expired) - 60_000) {
            return cache.accesstoken;
        }

        // ✅ 2. 이미 해당 계정이 갱신 중이면 기다림
        if (this.refreshingMap.has(account.account)) {
            await this.refreshingMap.get(account.account);
            return this.tokens.get(account.account)!.accesstoken;
        }

        // ✅ 3. 갱신 시작
        const refreshing = this.refreshToken(account);
        this.refreshingMap.set(account.account, refreshing);

        try {
            await refreshing;
        } finally {
            this.refreshingMap.delete(account.account);
        }

        return this.tokens.get(account.account)!.accesstoken;
    }

    private async refreshToken(account: BizppurioMessageAccount) {
        const auth = Crypto.codec.base64Encode(
            `${account.account}:${account.password}`,
        );

        const res = await this.http
            .use('bizppurioMessage')
            .post<BizppurioTokenResponse>(
                bizppurioMessageUris.message.token,
                undefined,
                {
                    headers: {
                        Authorization: `Basic ${auth}`,
                    },
                },
            );

        this.tokens.set(account.account, res);
    }

    async sendAlimtalk(
        account: BizppurioMessageAccount,
        payload: BizppurioAlimtalkSendRequest,
    ): Promise<BizppurioSendResponse> {
        const token = await this.getAccessToken(account);

        const response = await this.http
            .use('bizppurioMessage')
            .post<BizppurioSendResponse>(
                bizppurioMessageUris.message.send,
                {
                    account: account.account,
                    from: account.companyTel,
                    refkey: account.refKey,
                    type: 'at',
                    to: payload.to,
                    content: payload.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response;
    }

    async sendSms(
        account: BizppurioMessageAccount,
        payload: BizppurioSmsSendRequest,
        subject?: string,
    ): Promise<BizppurioSendResponse> {
        const token = await this.getAccessToken(account);

        const message = payload.content.sms.message;

        if (this.isOverLimit(message, 90)) {
            const lmsPayload = {
                account: account.account,
                from: account.companyTel,
                refkey: account.refKey,
                type: 'lms',
                to: payload.to,
                content: {
                    lms: {
                        subject: subject,
                        message: message,
                    },
                },
            } as BizppurioLmsSendRequest;
            return this.sendLms(account, lmsPayload);
        }

        const response = await this.http
            .use('bizppurioMessage')
            .post<BizppurioSendResponse>(
                bizppurioMessageUris.message.send,
                {
                    account: account.account,
                    from: account.companyTel,
                    refkey: account.refKey,
                    type: 'sms',
                    to: payload.to,
                    content: {
                        lms: {
                            subject: subject,
                            message: message,
                        },
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response;
    }

    async sendLms(
        account: BizppurioMessageAccount,
        payload: BizppurioLmsSendRequest,
    ): Promise<BizppurioSendResponse> {
        const token = await this.getAccessToken(account);

        const subject = payload.content.lms.subject;
        const message = payload.content.lms.message;

        if (this.isOverLimit(subject, 64)) {
            throw new Error('LMS 제목 최대 길이 64바이트 초과');
        }

        if (this.isOverLimit(message, 2000)) {
            throw new Error('LMS 내용 최대 길이 2000바이트 초과');
        }

        const response = await this.http
            .use('bizppurioMessage')
            .post<BizppurioSendResponse>(
                bizppurioMessageUris.message.send,
                {
                    account: account.account,
                    from: account.companyTel,
                    refkey: account.refKey,
                    type: 'lms',
                    to: payload.to,
                    content: payload.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

        return response;
    }

    private isOverLimit(data: string, limit: number): boolean {
        return Buffer.byteLength(data, 'utf8') > limit;
    }
}

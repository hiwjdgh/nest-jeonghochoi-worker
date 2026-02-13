import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    BizppurioAlimtalkSendRequest,
    BizppurioLmsSendRequest,
    BizppurioSendResponse,
    BizppurioSmsSendRequest,
    BizppurioTokenResponse,
} from './bizppurio.types';
import dayjs from 'dayjs';
import { HttpClient, Tool } from '@jeonghochoi/core-worker';

@Injectable()
export class BizppurioMessageClient {
    private readonly baseUrl: string;

    private readonly tokenUri: string;
    private readonly sendUri: string;
    private readonly timeoutMs: number;

    private token: string | null = null;
    private tokenExpiresAt = 0;
    private refreshing?: Promise<void>;

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        const baseUrl = this.config.getOrThrow('BIZPPURIO_MSG_BASE_URL');
        const tokenUri = this.config.getOrThrow('BIZPPURIO_MSG_TOKEN_URI');
        const sendUri = this.config.getOrThrow('BIZPPURIO_MSG_SEND_URI');
        const timeoutMs = this.config.getOrThrow<number>(
            'BIZPPURIO_MSG_TIMEOUT',
        );

        this.baseUrl = baseUrl;
        this.tokenUri = tokenUri;
        this.sendUri = sendUri;
        this.timeoutMs = timeoutMs;

        this.http.register('bizppurioMessage', {
            baseURL: this.baseUrl,
            retries: 3,
            timeoutMs: this.timeoutMs,
        });
    }

    private async getAccessToken(): Promise<string> {
        const now = Tool.time.nowUnixMs();

        // 아직 유효
        if (this.token && now < this.tokenExpiresAt - 60_000) {
            return this.token;
        }

        // 이미 갱신 중이면 대기
        if (this.refreshing) {
            await this.refreshing;
            return this.token!;
        }

        // 갱신 시작
        this.refreshing = this.refreshToken();
        await this.refreshing;
        this.refreshing = undefined;

        return this.token!;
    }

    private async refreshToken() {
        const id = this.config.getOrThrow('BIZPPURIO_MSG_ID');
        const password = this.config.getOrThrow('BIZPPURIO_MSG_PASSWORD');

        const auth = Buffer.from(`${id}:${password}`).toString('base64');

        const res = await this.http
            .use('bizppurioMessage')
            .post<BizppurioTokenResponse>(this.tokenUri, undefined, {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
                timeout: this.timeoutMs,
            });

        this.token = res.accesstoken;
        this.tokenExpiresAt = Tool.time.nowUnixMs();
    }

    private isOverLimit(data: string, limit): boolean {
        return Buffer.byteLength(data, 'utf8') > limit;
    }

    async sendAlimtalk(
        payload: BizppurioAlimtalkSendRequest,
    ): Promise<BizppurioSendResponse> {
        await this.getAccessToken();

        const response = await this.http
            .use('bizppurioMessage')
            .post<BizppurioSendResponse>(this.sendUri, payload, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                timeout: this.timeoutMs,
            });

        return response;
    }

    async sendSms(
        payload: BizppurioSmsSendRequest,
        subject?: string,
    ): Promise<BizppurioSendResponse> {
        await this.getAccessToken();

        const message = payload.content.sms.message;

        if (this.isOverLimit(message, 90)) {
            const lmsPayload = {
                account: payload.account,
                type: 'lms',
                refkey: payload.refkey,
                from: payload.from,
                to: payload.to,
                content: {
                    lms: {
                        subject: subject,
                        message: message,
                    },
                },
            } as BizppurioLmsSendRequest;
            return this.sendLms(lmsPayload);
        }

        const response = await this.http
            .use('bizppurioMessage')
            .post<BizppurioSendResponse>(this.sendUri, payload, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                timeout: this.timeoutMs,
            });

        return response;
    }

    async sendLms(
        payload: BizppurioLmsSendRequest,
    ): Promise<BizppurioSendResponse> {
        await this.getAccessToken();

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
            .post<BizppurioSendResponse>(this.sendUri, payload, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                timeout: this.timeoutMs,
            });

        return response;
    }
}

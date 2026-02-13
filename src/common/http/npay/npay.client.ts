import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from '@jeonghochoi/core-worker';
import { NpayRequestOptions } from './npay.types';

@Injectable()
export class NpayClient {
    private readonly baseUrl: string;
    private readonly timeoutMs: number;

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        const baseUrl = this.config.getOrThrow<string>('NPAY_BASE_URL');
        const timeoutMs = this.config.getOrThrow<number>('NPAY_TIMEOUT');

        this.baseUrl = baseUrl;
        this.timeoutMs = timeoutMs;

        this.http.register('npay', {
            baseURL: this.baseUrl,
            retries: 3,
            timeoutMs: this.timeoutMs,
        });
    }

    async post<TResponse = unknown>(
        uri: string,
        payload: unknown,
        options?: NpayRequestOptions,
    ): Promise<TResponse> {
        const response = await this.http
            .use('npay')
            .post<TResponse>(uri, payload, {
                headers: options?.headers,
                timeout: options?.timeout ?? this.timeoutMs,
            });

        return response;
    }
}

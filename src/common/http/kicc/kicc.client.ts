import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from '@jeonghochoi/core-worker';
import { KiccRequestOptions } from './kicc.types';

@Injectable()
export class KiccClient {
    private readonly baseUrl: string;
    private readonly timeoutMs: number;

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        const baseUrl = this.config.getOrThrow<string>('KICC_BASE_URL');
        const timeoutMs = this.config.getOrThrow<number>('KICC_TIMEOUT');

        this.baseUrl = baseUrl;
        this.timeoutMs = timeoutMs;

        this.http.register('kicc', {
            baseURL: this.baseUrl,
            retries: 3,
            timeoutMs: this.timeoutMs,
        });
    }

    async post<TResponse = unknown>(
        uri: string,
        payload: unknown,
        options?: KiccRequestOptions,
    ): Promise<TResponse> {
        const response = await this.http
            .use('kicc')
            .post<TResponse>(uri, payload, {
                headers: options?.headers,
                timeout: options?.timeout ?? this.timeoutMs,
            });

        return response;
    }
}

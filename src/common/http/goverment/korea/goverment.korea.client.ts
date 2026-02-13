import { HttpClient } from '@jeonghochoi/core-worker';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GovermentKoreaClient {
    private readonly baseUrl: string;
    private readonly timeoutMs: number;

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        const baseUrl = this.config.getOrThrow('GOVERMENT_KOREA_DATA_BASE_URL');

        const timeoutMs = this.config.getOrThrow<number>(
            'GOVERMENT_KOREA_DATA_TIMEOUT',
        );

        this.baseUrl = baseUrl;
        this.timeoutMs = timeoutMs;

        this.http.register('govKorea', {
            baseURL: this.baseUrl,
            retries: 3,
            timeoutMs: this.timeoutMs,
        });
    }
}

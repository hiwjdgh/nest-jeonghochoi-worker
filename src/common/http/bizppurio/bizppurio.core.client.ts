import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    BizppurioCoreGetAlimtalkTemplateRequest,
    BizppurioCoreGetAlimtalkTemplatesRequest,
    BizppurioCoreResponse,
} from './bizppurio.types';
import { HttpClient } from '@jeonghochoi/core-worker';

@Injectable()
export class BizppurioCoreClient {
    private readonly baseUrl: string;
    private readonly getAlimtalkTemplateUri: string;
    private readonly getAlimtalkTemplatesUri: string;
    private readonly timeoutMs: number;

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        const baseUrl = this.config.getOrThrow('BIZPPURIO_CORE_BASE_URL');
        const getAlimtalkTemplateUri = this.config.getOrThrow(
            'BIZPPURIO_CORE_GET_ALIMTALK_TEMPLATE_URI',
        );
        const getAlimtalkTemplatesUri = this.config.getOrThrow(
            'BIZPPURIO_CORE_GET_ALIMTALK_TEMPLATES_URI',
        );
        const timeoutMs = this.config.getOrThrow<number>(
            'BIZPPURIO_CORE_TIMEOUT',
        );

        this.baseUrl = baseUrl;
        this.getAlimtalkTemplateUri = getAlimtalkTemplateUri;
        this.getAlimtalkTemplatesUri = getAlimtalkTemplatesUri;
        this.timeoutMs = timeoutMs;

        this.http.register('bizppurioCore', {
            baseURL: this.baseUrl,
            retries: 3,
            timeoutMs: this.timeoutMs,
        });
    }

    async getAlimtalkTemplate(
        payload: BizppurioCoreGetAlimtalkTemplateRequest,
    ): Promise<BizppurioCoreResponse> {
        const response = await this.http
            .use('bizppurioCore')
            .post<BizppurioCoreResponse>(this.getAlimtalkTemplateUri, payload, {
                timeout: this.timeoutMs,
            });

        return response.data;
    }

    async getAlimtalkTemplates(
        payload: BizppurioCoreGetAlimtalkTemplatesRequest,
    ): Promise<BizppurioCoreResponse> {
        const response = await this.http
            .use('bizppurioCore')
            .post<BizppurioCoreResponse>(
                this.getAlimtalkTemplatesUri,
                payload,
                {
                    timeout: this.timeoutMs,
                },
            );

        return response.data;
    }
}

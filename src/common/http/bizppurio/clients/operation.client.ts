import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    AlimtalkTemplateRequest,
    AlimtalkTemplatesRequest,
    BizppurioOperationResponse,
    BizppurioOperationAccount,
} from '../bizppurio.types';
import { HttpClient } from '@jeonghochoi/core-worker';
import {
    bizppurioOperationBaseUrl,
    bizppurioOperationTimeout,
    bizppurioOperationUris,
} from '../bizppurio.constants';

@Injectable()
export class OperationClient {
    private readonly clientName = 'bizppurioOperation';
    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigService,
    ) {
        this.http.register('bizppurioOperation', {
            baseURL: bizppurioOperationBaseUrl,
            retries: 3,
            timeoutMs: bizppurioOperationTimeout,
        });
    }

    async getAccount(key: string): Promise<BizppurioOperationAccount> {
        /** 또는 DB 조회 */
        return await this.config.getOrThrow<Record<string, any>>(
            'BIZPPURIO_CLIENTS',
        )[key]['operation'];
    }

    async getAlimtalkTemplate(
        account: BizppurioOperationAccount,
        payload: AlimtalkTemplateRequest,
    ): Promise<BizppurioOperationResponse> {
        const response = await this.http
            .use('bizppurioOperation')
            .post<BizppurioOperationResponse>(bizppurioOperationUris.template, {
                bizId: account.bizId,
                apiKey: account.apiKey,
                senderKey: account.senderKey,
                templateCode: payload.templateCode,
            });

        return response.data;
    }

    async getAlimtalkTemplates(
        account: BizppurioOperationAccount,
        payload: AlimtalkTemplatesRequest,
    ): Promise<BizppurioOperationResponse> {
        const response = await this.http
            .use('bizppurioOperation')
            .post<BizppurioOperationResponse>(
                bizppurioOperationUris.templates,
                payload,
            );

        return response.data;
    }
}

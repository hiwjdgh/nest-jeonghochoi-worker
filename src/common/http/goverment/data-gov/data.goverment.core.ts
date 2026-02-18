import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    DATA_GOVERMENT_BASE_URL,
    DATA_GOVERMENT_TIMEOUT,
} from '../goverment.constants';
import { HttpClient, HttpEndpoint } from '@jeonghochoi/core-worker';

@Injectable()
export class DataGovermentCore implements OnModuleInit {
    constructor(private readonly http: HttpClient) {}

    onModuleInit() {
        this.http.register('dataGoverment', {
            baseURL: DATA_GOVERMENT_BASE_URL,
            retries: 3,
            timeoutMs: DATA_GOVERMENT_TIMEOUT,
        });
    }

    getClient(): HttpEndpoint {
        return this.http.use('dataGoverment');
    }
}

import { Injectable } from '@nestjs/common';
import { DataGovermentClient } from './data-gov/data.goverment.client';
import { GovermentAccount, KoreaGovermentType } from './goverment.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GovermentClient {
    constructor(
        private readonly config: ConfigService,
        public readonly dataGovermentClient: DataGovermentClient,
    ) {}

    /**
     *
     * @param type 사용할 정부 API 타입 (dataGoverment: 공공데이터 포털, local: 지방자치, institution: 공공기관)
     * @param key .env에 선언한 type에 맞는 키값
     * @returns 등록된 정부계정
     */
    async getAccount<T extends keyof GovermentAccount>(
        type: T,
        key: string,
    ): Promise<GovermentAccount[T]> {
        /** 또는 DB 조회 */
        return await this.config.getOrThrow<Record<string, any>>(
            'GOVERMENT_KOREA_CLIENTS',
        )[type][key];
    }
}

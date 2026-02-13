import { Injectable } from '@nestjs/common';
import { GovermentKoreaClient } from 'src/common/http/goverment/korea/goverment.korea.client';

@Injectable()
export class CollectionService {
    private readonly batchSize: number;

    constructor(private readonly govermentKoreaClient: GovermentKoreaClient) {
        this.batchSize = 1000;
    }

    async handle(payload: any) {
        switch (payload.method) {
            case 'RES_APT': // 아파트
            case 'RES_HOUSE': // 단독/다가구 _SINGLE: 단독, MULTI: 다가구
            case 'RES_MULTI': // 연립/다세대 _ROW: 연립, M
            case 'RES_OFFI': //오피스텔
                break;
            default:
                throw new Error(`Unsupported Method: ${payload.method}`);
        }
    }
}

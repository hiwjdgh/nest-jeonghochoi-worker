import { Module } from '@nestjs/common';
import { EvChargerClient } from './data-gov/clients/ev.charger.client';
import { HouseTradeClient } from './data-gov/clients/house.trade.client';
import { GovermentClient } from './goverment.client';
import { HttpModule } from '@jeonghochoi/core-worker';
import { DataGovermentClient } from './data-gov/data.goverment.client';
import { DataGovermentCore } from './data-gov/data.goverment.core';

@Module({
    imports: [HttpModule],
    providers: [
        /** 공공 데이터 포털 */
        DataGovermentCore,
        DataGovermentClient,
        EvChargerClient,
        HouseTradeClient,

        /** 지방자치 데이터 포털 */

        /** 공공기관 데이터 포털 */

        /** 정부 데이터 클라이언트 */
        GovermentClient,
    ],
    exports: [GovermentClient],
})
export class GovernmentModule {}

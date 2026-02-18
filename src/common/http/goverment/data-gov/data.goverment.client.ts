import { Injectable } from '@nestjs/common';
import { EvChargerClient } from './clients/ev.charger.client';
import { HouseTradeClient } from './clients/house.trade.client';

@Injectable()
export class DataGovermentClient {
    constructor(
        public readonly evCharger: EvChargerClient,
        public readonly houseTrade: HouseTradeClient,
    ) {}
}

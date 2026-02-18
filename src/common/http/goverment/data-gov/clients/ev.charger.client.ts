import { Injectable } from '@nestjs/common';
import { DATA_GOVERMENT_URIS } from '../../goverment.constants';
import {
    DataGovernmentAccount,
    GovermentDataEvChargerInfoRequest,
    GovermentDataEvChargerStatusRequest,
} from '../../goverment.types';
import { DataGovermentClient } from '../data.goverment.client';
import { DataGovermentCore } from '../data.goverment.core';
@Injectable()
export class EvChargerClient {
    constructor(private readonly core: DataGovermentCore) {}

    info(
        account: DataGovernmentAccount,
        params: GovermentDataEvChargerInfoRequest,
    ) {
        return this.core.getClient().get(DATA_GOVERMENT_URIS.evCharger.info, {
            params: {
                ...params,
                ...account,
            },
        });
    }

    status(
        account: DataGovernmentAccount,
        params: GovermentDataEvChargerStatusRequest,
    ) {
        return this.core.getClient().get(DATA_GOVERMENT_URIS.evCharger.status, {
            params: {
                ...params,
                ...account,
            },
        });
    }
}

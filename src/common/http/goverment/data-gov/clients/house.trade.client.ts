import { Injectable } from '@nestjs/common';
import {
    DataGovernmentAccount,
    GovermentDataApartmentRentRequest,
    GovermentDataApartmentSaleRequest,
    GovermentDataOfficetelRentRequest,
    GovermentDataOfficetelSaleRequest,
    GovermentDataRowHomeRentRequest,
    GovermentDataRowHomeSaleRequest,
    GovermentDataSingleHomeRentRequest,
    GovermentDataSingleHomeSaleRequest,
} from '../../goverment.types';
import { DATA_GOVERMENT_URIS } from '../../goverment.constants';
import { DataGovermentCore } from '../data.goverment.core';
@Injectable()
export class HouseTradeClient {
    constructor(private readonly core: DataGovermentCore) {}

    apartmentSale(
        account: DataGovernmentAccount,
        params: GovermentDataApartmentSaleRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.apartmentSale, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    apartmentRent(
        account: DataGovernmentAccount,
        params: GovermentDataApartmentRentRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.apartmentRent, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    officetelSale(
        account: DataGovernmentAccount,
        params: GovermentDataOfficetelSaleRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.officetelSale, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    officetelRent(
        account: DataGovernmentAccount,
        params: GovermentDataOfficetelRentRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.officetelRent, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    singleHomeSale(
        account: DataGovernmentAccount,
        params: GovermentDataRowHomeSaleRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.singleHomeSale, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    singleHomeRent(
        account: DataGovernmentAccount,
        params: GovermentDataRowHomeRentRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.singleHomeRent, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    rowHomeSale(
        account: DataGovernmentAccount,
        params: GovermentDataSingleHomeSaleRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.rowHomeSale, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }

    rowHomeRent(
        account: DataGovernmentAccount,
        params: GovermentDataSingleHomeRentRequest,
    ) {
        return this.core
            .getClient()
            .get(DATA_GOVERMENT_URIS.houseTrade.rowHomeRent, {
                params: {
                    ...params,
                    ...account,
                },
            });
    }
}

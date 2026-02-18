export const DATA_GOVERMENT_BASE_URL = 'https://apis.data.go.kr';

export const DATA_GOVERMENT_TIMEOUT = 10000;

export const DATA_GOVERMENT_URIS = {
    evCharger: {
        info: '/B552584/EvCharger/getChargerInfo',
        status: '/B552584/EvCharger/getChargerStatus',
    },
    houseTrade: {
        /**아파트 */
        apartmentSale: '/1613000/RTMSDataSvcAptTrade',
        apartmentSaleDetail: '/1613000/RTMSDataSvcAptTradeDev',
        apartmentRent: '/1613000/RTMSDataSvcAptRent',

        /**오피스텔 */
        officetelSale: '/1613000/RTMSDataSvcOffiTrade',
        officetelRent: '/1613000/RTMSDataSvcOffiRent',

        /**단독/다가구 */
        singleHomeSale: '/1613000/RTMSDataSvcSHTrade',
        singleHomeRent: '/1613000/RTMSDataSvcSHRent',

        /**연립/다세대 */
        rowHomeSale: '/1613000/RTMSDataSvcRHTrade',
        rowHomeRent: '/1613000/RTMSDataSvcRHRent',
    },
} as const;

/**
 * dataGoverment: 공공데이터 포털
 *
 */
export const GOVERMENT_TYPE = {
    dataGoverment: 'dataGoverment',
    local: 'local',
    institution: 'institution',
} as const;

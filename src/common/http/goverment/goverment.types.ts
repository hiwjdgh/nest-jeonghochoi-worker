import { GOVERMENT_TYPE } from './goverment.constants';

/** 공공데이터 계정  */
export interface DataGovernmentAccount {
    apiKey: string;
}

/** 지방자치 계정(todo)  */
export interface LocalGovernmentAccount {
    foo: string;
}

/** 공공기관 계정(todo)  */
export interface InstitutionGovernmentAccount {
    boo: string;
}

/** 정부 종류 정보 */
export type GovermentType = keyof typeof GOVERMENT_TYPE;
export type KoreaGovermentType = (typeof GOVERMENT_TYPE)[GovermentType];

/** 정부 계정  */
export type GovermentAccount = {
    dataGoverment: DataGovernmentAccount;
    local: LocalGovernmentAccount;
    institution: InstitutionGovernmentAccount;
};

/** 공공데이터 포털 기본 요청문 */
export interface GovermentDataRequestBase {
    serviceKey: string;
}

/** 전기차 충전기 요청문 */
export interface GovermentDataEvChargerStatusRequest {
    pageNo: number;
    numOfRows: number;
    period?: number;
    zcode?: string;
}
export interface GovermentDataEvChargerInfoRequest {
    numOfRows: number;
    period: number;
    zcode?: string;
}

/** 아파트 요청문 */
export interface GovermentDataApartmentSaleRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

export interface GovermentDataApartmentRentRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

/** 오피스텔 요청문 */
export interface GovermentDataOfficetelSaleRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

export interface GovermentDataOfficetelRentRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

/** 연립/다세대 요청문 */
export interface GovermentDataRowHomeSaleRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

export interface GovermentDataRowHomeRentRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

/** 단독/다가구 요청문 */
export interface GovermentDataSingleHomeSaleRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

export interface GovermentDataSingleHomeRentRequest {
    LAWD_CD: number;
    DEAL_YMD: number;
}

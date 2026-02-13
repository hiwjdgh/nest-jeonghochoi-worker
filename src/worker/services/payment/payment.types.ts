/** 지원하는 메소드 */
export type PaymentMethod =
    | 'CHAEVI_GUEST_CHARGING'
    | 'CHAEVI_MEMBER_CHARGING'
    | 'KECO_OUTBOUND_CHARGING'
    | 'KEPCO_OUTBOUND_CHARGING'
    | 'ECSP_OUTBOUND_CHARGING'
    | 'CHAEVI_CREDIT';

export interface PaymentPayload<T = any> {
    method: PaymentMethod;
    memberId: number;
    authContent?: string;

    reference: T;

    requester: string;
}

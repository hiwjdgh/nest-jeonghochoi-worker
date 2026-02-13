/** 지원하는 메소드 */
export type NotificationMethod = 'BROADCAST' | 'MARKETING';

export interface NotificationPayload<T = any> {
    method: NotificationMethod;
    memberId: number;
    authContent?: string;

    reference: T;

    requester: string;
}

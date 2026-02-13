export interface NpayRequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
}

export interface NpayApproveRequest {
    [key: string]: unknown;
}

export interface NpayCancelRequest {
    [key: string]: unknown;
}

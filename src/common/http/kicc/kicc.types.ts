export interface KiccRequestOptions {
    headers?: Record<string, string>;
    timeout?: number;
}

export interface KiccApproveRequest {
    [key: string]: unknown;
}

export interface KiccCancelRequest {
    [key: string]: unknown;
}

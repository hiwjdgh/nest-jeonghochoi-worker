export interface FcmTokenRequest {
    tokens: string[];
    notification: { title: string; body: string };
    data?: Record<string, string>;
}

export interface FcmTopicRequest {
    topic: string;
    notification: { title: string; body: string };
    data?: Record<string, string>;
}

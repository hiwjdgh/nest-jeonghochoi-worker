import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FcmTokenRequest, FcmTopicRequest } from './fcm.types';
import path from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FcmClient {
    private apps = new Map<string, admin.app.App>();

    constructor(private readonly config: ConfigService) {}
    async getAccount(key: string): Promise<any> {
        const app = this.apps.get(key);

        if (!app) {
            const jsonPath =
                this.config.getOrThrow<Record<string, any>>('FCM_CLIENTS')[key];

            const serviceAccountPath = path.resolve(jsonPath, 'fcm_auth.json');

            const serviceAccount = JSON.parse(
                readFileSync(serviceAccountPath, 'utf8'),
            );

            const app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });

            this.apps.set(key, app);
        }

        return this.apps.get(key);
    }

    async sendToTokens(account: string, payload: FcmTokenRequest) {
        return admin.messaging().sendEachForMulticast({
            ...payload,
        });
    }

    async sendToTopic(account: string, payload: FcmTopicRequest) {
        return admin.messaging().send({
            ...payload,
        });
    }
}

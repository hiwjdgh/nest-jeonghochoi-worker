import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FcmTokenRequest, FcmTopicRequest } from './fcm.types';
import path from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FcmClient implements OnModuleInit {
    constructor(private readonly config: ConfigService) {}

    onModuleInit() {
        if (admin.apps.length > 0) return;

        const jsonPath = this.config.getOrThrow('FCM_AUTH_JSON_DIR');

        const serviceAccountPath = path.resolve(jsonPath, 'fcm_auth.json');

        const serviceAccount = JSON.parse(
            readFileSync(serviceAccountPath, 'utf8'),
        );

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    async sendToTokens(payload: FcmTokenRequest) {
        return admin.messaging().sendEachForMulticast({
            ...payload,
        });
    }

    async sendToTopic(payload: FcmTopicRequest) {
        return admin.messaging().send({
            ...payload,
        });
    }
}

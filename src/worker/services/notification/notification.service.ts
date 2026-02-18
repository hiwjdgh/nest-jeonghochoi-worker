import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationRepository } from './notification.repository';
import { NotificationPayload } from './notification.types';
import { BizppurioClient } from 'src/common/http/bizppurio/bizppurio.client';
import { FcmClient } from 'src/common/http/fcm/fcm.client';
import { KiccClient } from 'src/common/http/kicc/kicc.client';

@Injectable()
export class NotificationService {
    constructor(
        private readonly repo: NotificationRepository,
        private readonly fcmClient: FcmClient,
        private readonly bizppurioClient: BizppurioClient,
        private readonly kiccClient: KiccClient,
        private readonly config: ConfigService,
    ) {}

    async handle(payload: NotificationPayload) {}
}

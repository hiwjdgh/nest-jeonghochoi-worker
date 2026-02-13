import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationRepository } from './notification.repository';
import { NotificationPayload } from './notification.types';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    private readonly batchSize: number;

    constructor(
        private readonly repo: NotificationRepository,
        private readonly config: ConfigService,
    ) {}

    async handle(payload: NotificationPayload) {}
}

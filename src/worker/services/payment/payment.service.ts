import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentRepository } from './payment.repository';
import { KiccClient } from 'src/common/http/kicc/kicc.client';
import { FcmClient } from 'src/common/http/fcm/fcm.client';
import { NpayClient } from 'src/common/http/npay/npay.client';
import { PaymentPayload } from './payment.types';
import { BizppurioClient } from 'src/common/http/bizppurio/bizppurio.client';

@Injectable()
export class PaymentService {
    private readonly batchSize: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly bizppurioClient: BizppurioClient,
        private readonly repo: PaymentRepository,
        private readonly fcmClient: FcmClient,
        private readonly kiccClient: KiccClient,
        private readonly npayClient: NpayClient,
    ) {}

    async handle(payload: PaymentPayload) {}
}

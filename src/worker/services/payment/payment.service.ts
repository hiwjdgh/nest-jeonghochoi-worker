import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentRepository } from './payment.repository';
import { KiccClient } from 'src/common/http/kicc/kicc.client';
import { BizppurioMessageClient } from 'src/common/http/bizppurio/bizppurio.message.client';
import { FcmClient } from 'src/common/http/fcm/fcm.client';
import { NpayClient } from 'src/common/http/npay/npay.client';
import { PaymentPayload } from './payment.types';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private readonly batchSize: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly bizppurioClient: BizppurioMessageClient,
        private readonly repo: PaymentRepository,
        private readonly fcmClient: FcmClient,
        private readonly kiccClient: KiccClient,
        private readonly npayClient: NpayClient,
    ) {}

    async handle(payload: PaymentPayload) {
        switch (payload.method) {
            case 'FOO_GUEST_CHARGING':
                this.payChaeviGuestCharging(payload);
                break;
            case 'FOO_MEMBER_CHARGING':
                this.payChaeviMemberCharging(payload);
                break;
            case 'KECO_OUTBOUND_CHARGING':
                this.payKecoOutboundCharging(payload);
                break;
            case 'KEPCO_OUTBOUND_CHARGING':
                this.payKepcoOutboundCharging(payload);
                break;
            case 'ECSP_OUTBOUND_CHARGING':
                this.payEcspOutboundCharging(payload);
                break;
            case 'FOO_CREDIT':
                this.payCredit(payload);
                break;

            default:
                throw new Error('');

                break;
        }
    }

    async payChaeviGuestCharging(payload: PaymentPayload) {}
    async payChaeviMemberCharging(payload: PaymentPayload) {}

    async payKecoOutboundCharging(payload: PaymentPayload) {}
    async payKepcoOutboundCharging(payload: PaymentPayload) {}
    async payEcspOutboundCharging(payload: PaymentPayload) {}
    async payCredit(payload: PaymentPayload) {}
}

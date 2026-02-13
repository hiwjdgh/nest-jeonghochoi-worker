import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentRepository } from './payment.repository';
import { KiccClient } from 'src/third-party/kicc/kicc.client';
import { BizppurioClient } from 'src/third-party/bizppurio/bizppurio.client';
import { FcmClient } from 'src/common/http/fcm/fcm.client';
import { NpayClient } from 'src/third-party/npay/npay.client';
import { PaymentPayload } from './payment.types';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private readonly batchSize: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly bizppurioClient: BizppurioClient,
        private readonly repo: PaymentRepository,
        private readonly fcmClient: FcmClient,
        private readonly kiccClient: KiccClient,
        private readonly npayClient: NpayClient,
    ) {}

    async handle(payload: PaymentPayload) {
        switch (payload.method) {
            case 'CHAEVI_GUEST_CHARGING':
                this.payChaeviGuestCharging(payload);
                break;
            case 'CHAEVI_MEMBER_CHARGING':
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
            case 'CHAEVI_CREDIT':
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

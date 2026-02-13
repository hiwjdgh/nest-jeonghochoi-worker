import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { BizppurioModule } from 'src/common/http/bizppurio/bizppurio.module';
import { FcmModule } from 'src/common/http/fcm/fcm.module';

@Module({
    imports: [BizppurioModule, FcmModule, KiccModule, NpayModule],
    providers: [PaymentService, PaymentRepository],
    exports: [PaymentService],
})
export class PaymentModule {}

import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { BizppurioModule } from 'src/common/http/bizppurio/bizppurio.module';
import { FcmModule } from 'src/common/http/fcm/fcm.module';
import { KiccModule } from 'src/common/http/kicc/kicc.module';
import { NpayModule } from 'src/common/http/npay/npay.module';

@Module({
    imports: [BizppurioModule, FcmModule, KiccModule, NpayModule],
    providers: [PaymentService, PaymentRepository],
    exports: [PaymentService],
})
export class PaymentModule {}

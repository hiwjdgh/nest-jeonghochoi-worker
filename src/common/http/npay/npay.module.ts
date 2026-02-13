import { Module } from '@nestjs/common';
import { HttpModule } from '@jeonghochoi/core-worker';
import { NpayClient } from './npay.client';

@Module({
    imports: [HttpModule],
    providers: [NpayClient],
    exports: [NpayClient],
})
export class NpayModule {}

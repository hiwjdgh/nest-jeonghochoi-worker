import { Module } from '@nestjs/common';
import { HttpModule } from '@jeonghochoi/core-worker';
import { KiccClient } from './kicc.client';

@Module({
    imports: [HttpModule],
    providers: [KiccClient],
    exports: [KiccClient],
})
export class KiccModule {}

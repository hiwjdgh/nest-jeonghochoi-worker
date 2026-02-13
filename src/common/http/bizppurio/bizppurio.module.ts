import { Module } from '@nestjs/common';
import { HttpModule } from '@jeonghochoi/core-worker';
import { BizppurioMessageClient } from './bizppurio.message.client';
import { BizppurioCoreClient } from './bizppurio.core.client';

@Module({
    imports: [HttpModule],
    providers: [BizppurioMessageClient, BizppurioCoreClient],
    exports: [BizppurioMessageClient, BizppurioCoreClient],
})
export class BizppurioModule {}

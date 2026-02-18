import { Module } from '@nestjs/common';
import { HttpModule } from '@jeonghochoi/core-worker';
import { MessageClient } from './clients/message.client';
import { OperationClient } from './clients/operation.client';
import { BizppurioClient } from './bizppurio.client';

@Module({
    imports: [HttpModule],
    providers: [MessageClient, OperationClient, BizppurioClient],
    exports: [BizppurioClient],
})
export class BizppurioModule {}

import { Module } from '@nestjs/common';
import { MailModule as CoreMailModule } from '@jeonghochoi/core-worker';
import { MailClient } from './mail.client';

@Module({
    imports: [CoreMailModule],
    providers: [MailClient],
    exports: [MailClient],
})
export class MailModule {}

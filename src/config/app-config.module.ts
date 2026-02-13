import { Module } from '@nestjs/common';
import {
    CoreConfigModule,
    DatabaseModule,
    HttpModule,
    LoggerModule,
    MailModule,
} from '@jeonghochoi/core-worker';

@Module({
    imports: [
        /**
         * Core infra config
         * - env → zod 검증
         */
        CoreConfigModule.forRoot(AppConfigSchema),

        /**
         * Infra modules
         */
        DatabaseModule,
        LoggerModule,
        HttpModule,
        MailModule,
    ],
})
export class AppConfigModule {}

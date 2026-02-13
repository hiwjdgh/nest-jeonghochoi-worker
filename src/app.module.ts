import { Module } from '@nestjs/common';
import { __Name__Processor } from './processors/__name__.processor';
import { AppConfigFactory } from './config/app-config.factory';
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
        CoreConfigModule.forRoot(AppConfigFactory),

        /**
         * Infra modules
         */
        DatabaseModule,
        LoggerModule,
        HttpModule,
        MailModule,
    ],
    providers: [__Name__Processor],
})
export class AppModule {}

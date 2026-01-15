// src/worker.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { redisConfig } from './config/redis.config';
import { __Name__Processor } from './processors/__name__.processor';

@Module({
    imports: [
        BullModule.forRoot({
            connection: redisConfig,
        }),
        BullModule.registerQueue({
            name: '__name__',
        }),
    ],
    providers: [__Name__Processor],
})
export class WorkerModule {}

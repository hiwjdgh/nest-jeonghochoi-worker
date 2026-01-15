import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { setupGracefulShutdown } from './bootstrap/shutdown';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(WorkerModule);
    setupGracefulShutdown(app);
}

bootstrap();

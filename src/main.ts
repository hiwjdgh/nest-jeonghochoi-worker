import { NestFactory } from '@nestjs/core';
import { AppConfigModule } from './config/app-config.module';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppConfigModule);

    await app.init();
}

/**
 * ─────────────────────────────
 * 프로세스 레벨 안전장치
 * ─────────────────────────────
 */
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

bootstrap();

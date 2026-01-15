// src/bootstrap/shutdown.ts
import { INestApplicationContext } from '@nestjs/common';

export function setupGracefulShutdown(app: INestApplicationContext) {
    const shutdown = async () => {
        console.log('[Worker] shutting down');
        await app.close();
        process.exit(0);
    };

    process.on('SIGTERM', () => {
        void shutdown();
    });

    process.on('SIGINT', () => {
        void shutdown();
    });
}

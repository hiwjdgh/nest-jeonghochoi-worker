import { z } from 'zod';
import {
    DatabaseConfigSchema,
    FtpConfigSchema,
    HttpConfigSchema,
    LoggerConfigSchema,
    S3ConfigSchema,
    SesConfigSchema,
    SmtpConfigSchema,
} from '@jeonghochoi/core-worker';

export const AppConfigSchema = z.object({
    // Database
    postgresql: DatabaseConfigSchema,

    // Logger
    logger: LoggerConfigSchema,

    // Http
    http: HttpConfigSchema,

    // Mail
    mailSmtp: SmtpConfigSchema.optional(),
    mailSes: SesConfigSchema.optional(),

    // Uploder
    ftpUploder: FtpConfigSchema.optional(),
    s3Uploader: S3ConfigSchema.optional(),

    // App
    app: z.object({
        name: z.string(),
        workerName: z.string(),
        concurrency: z.coerce.number().default(5),
    }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

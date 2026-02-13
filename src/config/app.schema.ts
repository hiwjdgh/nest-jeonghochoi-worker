import { z } from 'zod';
import {
    DatabaseConfigSchema,
    FtpConfigSchema,
    LoggerConfigSchema,
    S3ConfigSchema,
    SesConfigSchema,
    SmtpConfigSchema,
    TemplateConfigSchema,
} from '@jeonghochoi/core-worker';

export const AppConfigSchema = z.object({
    database: DatabaseConfigSchema,
    logger: LoggerConfigSchema,
    mailTemplateDir: TemplateConfigSchema,

    smtp: SmtpConfigSchema.optional(),
    ses: SesConfigSchema.optional(),

    ftp: FtpConfigSchema.optional(),
    s3: S3ConfigSchema.optional(),

    app: z.object({
        name: z.string(),
        workerName: z.string(),
        concurrency: z.coerce.number().default(5),
    }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

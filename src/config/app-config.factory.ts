import { CoreConfigFactory, loadEnv } from '@jeonghochoi/core-worker';
import { AppConfig, AppConfigSchema } from './app.schema';

const env = loadEnv();

function parseJson<T>(raw: string | undefined): T | undefined {
    if (!raw) return undefined;
    return JSON.parse(raw) as T;
}

export const AppConfigFactory: CoreConfigFactory<AppConfig> = {
    schema: AppConfigSchema,
    load: () => {
        const mailProvider = env.MAIL_PROVIDER;

        return {
            database: parseJson(env.DATABASE_CONFIG),
            logger: parseJson(env.LOGGER_CONFIG),
            mailTemplateDir: {
                templateDir: env.MAIL_TEMPLATE_DIR,
            },
            ftp: parseJson(env.FTP_CONFIG),
            s3: parseJson(env.S3_CONFIG),

            smtp:
                mailProvider === 'smtp'
                    ? {
                          host: env.SMTP_HOST,
                          port: env.SMTP_PORT,
                          secure: env.SMTP_SECURE === 'true',
                          user: env.SMTP_USER,
                          password: env.SMTP_PASSWORD,
                          from: env.SMTP_FROM,
                      }
                    : undefined,

            ses:
                mailProvider === 'ses'
                    ? {
                          region: env.SES_REGION,
                          credentials: {
                              accessKeyId: env.SES_ACCESS_KEY_ID,
                              secretAccessKey: env.SES_SECRET_ACCESS_KEY,
                          },
                          from: env.SES_FROM,
                      }
                    : undefined,

            app: {
                name: env.APP_NAME,
                workerName: env.WORKER_NAME,
                concurrency: env.WORKER_CONCURRENCY,
            },
        };
    },
};

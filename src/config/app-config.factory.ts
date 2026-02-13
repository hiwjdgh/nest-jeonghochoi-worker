import { ConfigService } from '@nestjs/config';
import { AppConfigSchema, AppConfig } from './app.schema';
import { CoreConfigFactory } from '@jeonghochoi/core-worker';

export class AppConfigFactory implements CoreConfigFactory<AppConfig> {
    constructor(private readonly config: ConfigService) {}

    schema = AppConfigSchema;

    load(): unknown {
        const mailProvider = this.config.get('MAIL_PROVIDER'); // smtp | ses

        return {
            // ===== database =====
            database: JSON.parse(
                this.config.getOrThrow<string>('DATABASE_CONFIG'),
            ),

            // ===== mail =====
            smtp:
                mailProvider === 'smtp'
                    ? {
                          host: this.config.getOrThrow('SMTP_HOST'),
                          port: this.config.getOrThrow('SMTP_PORT'),
                          secure: this.config.get('SMTP_SECURE') === 'true',
                          user: this.config.getOrThrow('SMTP_USER'),
                          password: this.config.getOrThrow('SMTP_PASSWORD'),
                      }
                    : undefined,

            ses:
                mailProvider === 'ses'
                    ? {
                          region: this.config.getOrThrow('SES_REGION'),
                          accessKeyId:
                              this.config.getOrThrow('SES_ACCESS_KEY_ID'),
                          secretAccessKey: this.config.getOrThrow(
                              'SES_SECRET_ACCESS_KEY',
                          ),
                      }
                    : undefined,

            // ===== app =====
            app: {
                name: this.config.getOrThrow('APP_NAME'),
                workerName: this.config.getOrThrow('WORKER_NAME'),
                concurrency: this.config.get('WORKER_CONCURRENCY'),
            },
        };
    }
}

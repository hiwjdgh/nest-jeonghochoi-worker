import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

import { ExportRepository } from './export.repository';
import { UploaderFactory } from 'src/common/file/uploader/uploader.factory';
import { WriterFactory } from 'src/common/file/writer/writer.factory';
import dayjs from 'dayjs';
import { ExportPayload } from './export.types';
import { MailFactory } from 'src/common/mail/mail.factory';
import { BizppurioClient } from 'src/third-party/bizppurio/bizppurio.client';

@Injectable()
export class ExportService {
    private readonly logger = new Logger(ExportService.name);
    private readonly batchSize: number;

    constructor(
        private readonly repo: ExportRepository,
        private readonly config: ConfigService,
        private readonly writerFactory: WriterFactory,
        private readonly uploaderFactory: UploaderFactory,
        private readonly mailFactory: MailFactory,
        private readonly bizppurioClient: BizppurioClient,
    ) {
        this.batchSize = this.config.getOrThrow<number>('EXPORT_BATCH_SIZE');
    }

    async handle(payload: ExportPayload) {
        switch (payload.method) {
            case 'CSMS_EXPORT':
                await this.exportCsms(payload);
                break;
            default:
                throw new Error(`Unsupported Method: ${payload.method}`);
        }
    }

    async exportCsms(payload: ExportPayload) {
        const fileName = this.buildFileName(payload);
        const localPath = path.join('/tmp', fileName);

        const writer = this.writerFactory.get(payload.file.fileFormat);
        const uploader = this.uploaderFactory.get(
            payload.upload.uploadTarget,
            payload.upload.ftpId,
        );

        this.logger.log(
            `Export started format=${payload.file.fileFormat}, target=${payload.upload.uploadTarget}`,
        );

        try {
            /* 1️⃣ 파일 생성 */
            await writer.write({
                filePath: localPath,
                fileStyle: payload.file.fileStyle,
                sheetName: fileName,
                cursorKey: 'id',
                columns: payload.file.columns,
                fetchAll: () =>
                    this.repo.fetchCsmsData(
                        payload.data.dbms,
                        payload.data.rds,
                        payload.data.targetDb,
                        payload.data.query,
                    ),
            });

            this.logger.log(`Write completed`);

            /* 2️⃣ 업로드 */
            const uploadResult = await uploader.upload({
                sourcePath: localPath,
                targetPath: `${payload.upload.targetPath}${fileName}`,
            });

            this.logger.log(
                `Upload completed: ${JSON.stringify(uploadResult)}`,
            );

            await this.mailFactory.get('SMTP', 'SMTP').send({
                to: payload.mail.receipients.to,
                cc: payload.mail.receipients.cc,
                subject: payload.mail.subject,
                template: {
                    templatePath: 'export/export-complete',
                    context: uploadResult,
                },
            });

            this.logger.log(`Mail completed`);

            /* await this.bizppurioClient.sendSms(
                {
                    account: this.config.getOrThrow<string>('BIZPPURIO_MSG_ID'),
                    type: 'sms',
                    refkey: this.config.getOrThrow<string>(
                        'BIZPPURIO_MSG_REF_KEY',
                    ),
                    from: this.config.getOrThrow<string>(
                        'BIZPPURIO_COMPANY_TEL',
                    ),
                    to: '01075511045',
                    content: {
                        sms: {
                            message: `CSMS 내보내기가 완료되었습니다. 그룹웨어 메일을 확인해주세요.`,
                        },
                    },
                },
                payload.mail.subject,
            ); */
            this.logger.log(`SMS completed`);

            await this.logger.log(`Export completed`);
        } finally {
            /* 3️⃣ 로컬 파일 정리 */
            if (fs.existsSync(localPath)) {
                fs.unlinkSync(localPath);
            }
        }
    }

    private buildFileName(payload: ExportPayload): string {
        const prefix = payload.file.fileName;
        const ts = dayjs().format('YYYYMMDDHHmmssSSS');
        const ext = payload.file.fileFormat.toLowerCase();

        const fileName = `${prefix}_${ts}.${ext}`;
        this.logger.log(`내보내기 파일명: ${fileName}`);
        return fileName;
    }
}

import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportRepository } from './export.repository';
import { BizppurioModule } from 'src/common/http/bizppurio/bizppurio.module';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
    imports: [MailModule, BizppurioModule],
    providers: [ExportService, ExportRepository],
    exports: [ExportService],
})
export class ExportModule {}

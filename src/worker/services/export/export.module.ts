import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportRepository } from './export.repository';
import { BizppurioModule } from 'src/common/http/bizppurio/bizppurio.module';
import { FileModule } from 'src/common/file/file.module';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
    imports: [FileModule, MailModule, BizppurioModule],
    providers: [ExportService, ExportRepository],
    exports: [ExportService],
})
export class ExportModule {}

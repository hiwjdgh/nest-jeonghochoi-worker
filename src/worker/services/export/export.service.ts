import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

import { ExportRepository } from './export.repository';
import { ExportPayload } from './export.types';
import { BizppurioClient } from 'src/common/http/bizppurio/bizppurio.client';

@Injectable()
export class ExportService {
    private readonly batchSize: number;

    constructor(
        private readonly config: ConfigService,
        private readonly repo: ExportRepository,
        private readonly bizppurioClient: BizppurioClient,
    ) {}

    async handle(payload: ExportPayload) {}
}

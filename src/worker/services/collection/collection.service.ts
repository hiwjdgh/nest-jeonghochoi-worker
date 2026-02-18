import { MailService } from '@jeonghochoi/core-worker';
import { Injectable } from '@nestjs/common';
import { GovermentClient } from 'src/common/http/goverment/goverment.client';

@Injectable()
export class CollectionService {
    private readonly batchSize: number;

    constructor(
        private readonly mailService: MailService,
        private readonly govermentClient: GovermentClient,
    ) {
        this.batchSize = 1000;
    }

    async handle(payload: any) {}
}

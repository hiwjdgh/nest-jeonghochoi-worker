import { Injectable } from '@nestjs/common';
import { OperationClient } from './clients/operation.client';
import { MessageClient } from './clients/message.client';

@Injectable()
export class BizppurioClient {
    constructor(
        public readonly operation: OperationClient,
        public readonly message: MessageClient,
    ) {}
}

import { DatabaseAdapterRegistry } from '@jeonghochoi/core-worker';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExportRepository {
    constructor(adapters: DatabaseAdapterRegistry) {}
}

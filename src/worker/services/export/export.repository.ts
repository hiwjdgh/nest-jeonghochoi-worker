import { Injectable, Logger } from '@nestjs/common';
import { DbAdapterRegistry } from 'src/common/db/adapter/db-adapter.registry';
import { CommonRepository } from 'src/worker/base/common.repository';

@Injectable()
export class ExportRepository extends CommonRepository {
    private readonly logger = new Logger(ExportRepository.name);

    constructor(adapters: DbAdapterRegistry) {
        super(adapters);
    }

    async fetchCsmsData(
        dbms: string,
        rds: string,
        database: string,
        query: any,
    ): Promise<any[]> {
        this.logger.log(dbms, rds, database);
        const req = await this.request(dbms, rds, database);

        let result;
        switch (query.target) {
            case 'station':
                result = await req.query(`
                    EXEC SpBatchExportCsmsManageStation
                `);
                break;
            case 'charger':
                result = await req.query(`
                    EXEC SpBatchExportCsmsManageCharger
                `);
                break;
            case 'memberCard':
                result = await req.input('espId', query.espId).query(`
                    EXEC SpBatchExportCsmsManageMemberCard @espId
                `);
                break;
            case 'memberCardIssue':
                result = await req
                    .input('startDate', query.startDate)
                    .input('endDate', query.endDate).query(`
                    EXEC SpBatchExportCsmsManageMemberCardIssue @startDate, @endDate
                `);
                break;

            default:
                throw new Error('지원하지않는 내보내기 입니다.');
        }

        return result.recordset;
    }
}

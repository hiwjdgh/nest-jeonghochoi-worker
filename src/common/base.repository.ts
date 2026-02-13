import { DatabaseAdapterRegistry } from '@jeonghochoi/core-worker';

export type DbmsType = 'mysql' | 'mssql' | 'postgresql';

export abstract class BaseRepository {
    constructor(protected readonly registry: DatabaseAdapterRegistry) {}

    /**
     * DB 커넥션 요청
     *
     * @param dbms DBMS 종류
     * @param rdsId DB 인스턴스 (MAIN, ANALYTICS, LEGACY 등)
     * @param database DB 이름
     */
    protected async getDb(dbms: DbmsType, rdsId: string, database: string) {
        const adapter = this.registry.get(dbms);
        return adapter.getConnection(rdsId, database);
    }
}

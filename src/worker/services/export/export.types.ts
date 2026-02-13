import {
    FileColumn,
    FileFormat,
    FileStyle,
    UploadTarget,
} from 'src/common/file/file.types';

/** 지원하는 메소드 */
export type ExportMethod = 'CSMS_EXPORT';

/* ===== payload 타입 (JobPayloadSchemaMap과 동일해야 함) ===== */
export interface ExportPayload {
    method: ExportMethod;

    file: {
        fileName: string;
        fileFormat: FileFormat; // 'XLSX' | 'CSV',
        columns: FileColumn[];
        fileStyle: FileStyle;
    };

    upload: {
        uploadTarget: UploadTarget; // 'FTP' | 'S3' | 'LOCAL'
        targetPath: string;
        ftpId?: string;
    };

    data: {
        dbms: string;
        rds: string;
        targetDb: string;
        query?: any;
    };

    mail: {
        subject: string;
        receipients: {
            to: string | string[];
            cc?: string | string[];
        };
    };
}

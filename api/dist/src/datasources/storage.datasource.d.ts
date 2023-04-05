import { juggler } from '@loopback/service-proxy';
export declare class StorageDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}

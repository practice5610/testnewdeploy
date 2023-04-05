import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { BankInfo, BankInfoRelations } from '../models';
export declare class BankInfoRepository extends DefaultCrudRepository<BankInfo, typeof BankInfo.prototype._id, BankInfoRelations> {
    constructor(dataSource: MongodbDataSource);
}

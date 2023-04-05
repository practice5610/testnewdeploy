import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { BoomAccount, BoomAccountRelations } from '../models';
export declare class BoomAccountRepository extends DefaultCrudRepository<BoomAccount, typeof BoomAccount.prototype._id, BoomAccountRelations> {
    constructor(dataSource: MongodbDataSource);
}

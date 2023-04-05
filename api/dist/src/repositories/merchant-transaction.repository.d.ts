import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { MerchantTransaction, MerchantTransactionRelations } from '../models';
export declare class MerchantTransactionRepository extends DefaultCrudRepository<MerchantTransaction, typeof MerchantTransaction.prototype._id, MerchantTransactionRelations> {
    constructor(dataSource: MongodbDataSource);
}

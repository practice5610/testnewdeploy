import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Transaction, TransactionRelations } from '../models';
export declare class TransactionRepository extends DefaultCrudRepository<Transaction, typeof Transaction.prototype._id, TransactionRelations> {
    constructor(dataSource: MongodbDataSource);
}

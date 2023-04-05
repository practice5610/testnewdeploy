import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Store, StoreRelations } from '../models';
export declare class StoreRepository extends DefaultCrudRepository<Store, typeof Store.prototype._id, StoreRelations> {
    constructor(dataSource: MongodbDataSource);
}

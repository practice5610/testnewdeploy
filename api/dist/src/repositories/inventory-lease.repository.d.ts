import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { InventoryLease, InventoryLeaseRelations } from '../models';
export declare class InventoryLeaseRepository extends DefaultCrudRepository<InventoryLease, typeof InventoryLease.prototype._id, InventoryLeaseRelations> {
    constructor(dataSource: MongodbDataSource);
}

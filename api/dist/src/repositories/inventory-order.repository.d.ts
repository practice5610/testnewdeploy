import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { InventoryOrder, InventoryOrderRelations } from '../models';
export declare class InventoryOrderRepository extends DefaultCrudRepository<InventoryOrder, typeof InventoryOrder.prototype._id, InventoryOrderRelations> {
    constructor(dataSource: MongodbDataSource);
}

import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { InventoryItem, InventoryItemRelations } from '../models';
export declare class InventoryItemRepository extends DefaultCrudRepository<InventoryItem, typeof InventoryItem.prototype._id, InventoryItemRelations> {
    constructor(dataSource: MongodbDataSource);
}

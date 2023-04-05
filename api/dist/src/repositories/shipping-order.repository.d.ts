import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ShippingOrder, ShippingOrderRelations } from '../models';
export declare class ShippingOrderRepository extends DefaultCrudRepository<ShippingOrder, typeof ShippingOrder.prototype._id, ShippingOrderRelations> {
    constructor(dataSource: MongodbDataSource);
}

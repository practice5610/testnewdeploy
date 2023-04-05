import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ShippingBox, ShippingBoxRelations } from '../models';
export declare class ShippingBoxRepository extends DefaultCrudRepository<ShippingBox, typeof ShippingBox.prototype._id, ShippingBoxRelations> {
    constructor(dataSource: MongodbDataSource);
}

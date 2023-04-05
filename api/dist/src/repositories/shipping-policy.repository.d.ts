import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ShippingPolicy, ShippingPolicyRelations } from '../models';
export declare class ShippingPolicyRepository extends DefaultCrudRepository<ShippingPolicy, typeof ShippingPolicy.prototype._id, ShippingPolicyRelations> {
    constructor(dataSource: MongodbDataSource);
}

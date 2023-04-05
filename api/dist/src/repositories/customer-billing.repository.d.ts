import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { CustomerBilling, CustomerBillingRelations } from '../models';
export declare class CustomerBillingRepository extends DefaultCrudRepository<CustomerBilling, typeof CustomerBilling.prototype._id, CustomerBillingRelations> {
    constructor(dataSource: MongodbDataSource);
}

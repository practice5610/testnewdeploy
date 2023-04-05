import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ReturnPolicyModel, ReturnPolicyRelations } from '../models';
export declare class ReturnPolicyRepository extends DefaultCrudRepository<ReturnPolicyModel, typeof ReturnPolicyModel.prototype._id, ReturnPolicyRelations> {
    constructor(dataSource: MongodbDataSource);
}

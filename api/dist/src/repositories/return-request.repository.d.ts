import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ReturnRequestModel, ReturnRequestRelations } from '../models';
export declare class ReturnRequestRepository extends DefaultCrudRepository<ReturnRequestModel, typeof ReturnRequestModel.prototype._id, ReturnRequestRelations> {
    constructor(dataSource: MongodbDataSource);
}

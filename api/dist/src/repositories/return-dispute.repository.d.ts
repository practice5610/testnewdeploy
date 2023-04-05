import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { ReturnDisputeModel, ReturnDisputeRelations } from '../models';
export declare class ReturnDisputeRepository extends DefaultCrudRepository<ReturnDisputeModel, typeof ReturnDisputeModel.prototype._id, ReturnDisputeRelations> {
    constructor(dataSource: MongodbDataSource);
}

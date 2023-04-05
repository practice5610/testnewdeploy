import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { BoomCard, BoomCardRelations } from '../models';
export declare class BoomCardRepository extends DefaultCrudRepository<BoomCard, typeof BoomCard.prototype._id, BoomCardRelations> {
    constructor(dataSource: MongodbDataSource);
}

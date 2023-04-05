import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Review, ReviewRelations } from '../models';
export declare class ReviewRepository extends DefaultCrudRepository<Review, typeof Review.prototype.content, ReviewRelations> {
    constructor(dataSource: MongodbDataSource);
}

import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Category, CategoryRelations } from '../models';
export declare class CategoryRepository extends DefaultCrudRepository<Category, typeof Category.prototype._id, CategoryRelations> {
    constructor(dataSource: MongodbDataSource);
}

import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Product, ProductRelations } from '../models';
export declare class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype._id, ProductRelations> {
    constructor(dataSource: MongodbDataSource);
}

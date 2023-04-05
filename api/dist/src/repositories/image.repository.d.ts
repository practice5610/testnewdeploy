import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Image, ImageRelations } from '../models';
export declare class ImageRepository extends DefaultCrudRepository<Image, typeof Image.prototype._id, ImageRelations> {
    constructor(dataSource: MongodbDataSource);
}

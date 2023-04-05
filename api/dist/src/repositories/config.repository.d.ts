import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Config, ConfigRelations } from '../models';
export declare class ConfigRepository extends DefaultCrudRepository<Config, typeof Config.prototype._id, ConfigRelations> {
    constructor(dataSource: MongodbDataSource);
}

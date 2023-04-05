import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Offer, OfferRelations } from '../models';
export declare class OfferRepository extends DefaultCrudRepository<Offer, typeof Offer.prototype._id, OfferRelations> {
    constructor(dataSource: MongodbDataSource);
}

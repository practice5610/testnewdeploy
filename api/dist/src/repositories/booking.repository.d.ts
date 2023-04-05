import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Booking, BookingRelations } from '../models';
export declare class BookingRepository extends DefaultCrudRepository<Booking, typeof Booking.prototype._id, BookingRelations> {
    constructor(dataSource: MongodbDataSource);
}

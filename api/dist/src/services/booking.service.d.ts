import { APIResponse } from '@boom-platform/globals';
import { Count, DataObject, Filter, Options, Where } from '@loopback/repository';
import { Logger } from 'log4js';
import { Booking } from '../models';
import { BookingRepository, OfferRepository, ProductRepository } from '../repositories';
import { BookingValidationResult } from '../types';
import { OfferService } from './offer.service';
import { ProductService } from './product.service';
export declare class BookingService {
    bookingRepository: BookingRepository;
    productRepository: ProductRepository;
    offerRepository: OfferRepository;
    productService: ProductService;
    offerService: OfferService;
    logger: Logger;
    constructor(bookingRepository: BookingRepository, productRepository: ProductRepository, offerRepository: OfferRepository, productService: ProductService, offerService: OfferService);
    /**
     * Creates bookings,
     * @param {(Booking[] | null)} bookings bookings contain booking information
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling this method.
     * @returns {Promise<BookingResult>}
     * @memberof BookingService
     */
    createBookings(bookings: Booking[], options?: Options): Promise<APIResponse<BookingValidationResult>>;
    /**
     * Get Booking By Id,
     * @param {string} booking_id Booking ID related to MongoDB ObjectID
     * @returns {Promise<Booking>} Return a Booking entity by id, or rejected promise if not found.
     * @memberof BookingService
     */
    getBookingById(booking_id: string): Promise<APIResponse<Booking>>;
    findBookings(filter: Filter<Booking>): Promise<APIResponse<Booking[]>>;
    updateAllBookings(data: DataObject<Booking>, where?: Where<Booking> | undefined): Promise<APIResponse<Count>>;
    updateBookingById(id: string, data: DataObject<Booking>): Promise<APIResponse<void>>;
    deleteBookingById(id: string): Promise<APIResponse<void>>;
    countBooking(where?: Where<Booking>): Promise<APIResponse<Count>>;
    /**
     * Validate Booking list
     * @param {Booking[]} bookingList an array of bookings
     * @return BookingValidationResult which contain two arrays for valids and invalids bookings.
     */
    validateBookings(bookingList: Booking[]): Promise<APIResponse<BookingValidationResult>>;
}

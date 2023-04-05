/// <reference types="express" />
import { AllOptional, AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Booking } from '../models';
import { BookingService, StoreService } from '../services';
export declare class BookingController {
    protected response: Response;
    bookingService: BookingService;
    storeService: StoreService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: Logger;
    constructor(response: Response, bookingService: BookingService, storeService: StoreService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    create(bookings: Booking[]): Promise<Response>;
    count(where?: Where<Booking>): Promise<Response>;
    find(filter?: Filter<Booking>): Promise<Response<Booking[]>>;
    updateAll(booking: AllOptional<Booking>, where?: Where<Booking>): Promise<Response<Count>>;
    findById(id: string): Promise<Response<Booking>>;
    updateById(id: string, booking: AllOptional<Booking>): Promise<Response>;
    deleteById(id: string): Promise<Response>;
}

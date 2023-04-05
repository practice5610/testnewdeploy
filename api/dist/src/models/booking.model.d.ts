import { BookingStatus, BookingTypes } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Offer } from './offer.model';
import { Product } from './product.model';
export declare class Booking extends Entity {
    _id: string;
    createdAt: number;
    /**
     * need to figure out how to describe dates
     */
    updatedAt: number;
    type: BookingTypes;
    item: Offer | Product;
    quantity: number;
    status: BookingStatus;
    memberUID: string;
    visits?: number;
    constructor(data?: Partial<Booking>);
}
export interface BookingRelations {
}
export declare type BookingWithRelations = Booking & BookingRelations;

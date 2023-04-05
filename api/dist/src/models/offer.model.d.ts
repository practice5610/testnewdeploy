import { Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Product } from './product.model';
export declare class Offer extends Entity {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    cashBackPerVisit?: Money;
    conditions?: string[];
    description?: string;
    maxQuantity: number;
    maxVisits: number;
    merchantUID: string;
    startDate?: number;
    title?: string;
    product: Product;
    expiration: number;
    returnPolicy?: string;
    constructor(data?: Partial<Offer>);
}
export interface OfferRelations {
}
export declare type OfferWithRelations = Offer & OfferRelations;

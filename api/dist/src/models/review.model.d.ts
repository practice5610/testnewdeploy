import { Entity } from '@loopback/repository';
import { Store } from './store.model';
export declare class Review extends Entity {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    content?: string;
    memberUID?: string;
    /**
     * why is merchant uid listed twice???
     */
    merchantUID?: string;
    rating?: number;
    date?: number;
    store?: Partial<Store>;
    constructor(data?: Partial<Review>);
}
export interface ReviewRelations {
}
export declare type ReviewWithRelations = Review & ReviewRelations;

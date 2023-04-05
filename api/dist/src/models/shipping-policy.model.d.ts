import { FreeShippingThreshold, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class ShippingPolicy extends Entity {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    name: string;
    merchantId: string;
    flatRate?: Money;
    itemsPerFlatRate?: number;
    freeShippingThresholds?: FreeShippingThreshold[];
    pickUpOnly?: boolean;
    pickUpLocations?: string[];
}
export interface ShippingPolicyRelations {
}
export declare type ShippingPolicyWithRelations = ShippingPolicy & ShippingPolicyRelations;

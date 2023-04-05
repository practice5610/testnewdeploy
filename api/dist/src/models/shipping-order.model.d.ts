import { Money, ShippingOrderStatus } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class ShippingOrder extends Entity {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    shippo_id?: string;
    trackingNumber?: string;
    trackingLink?: string;
    price: Money;
    purchaser: string;
    status: ShippingOrderStatus;
}
export interface ShippingOrderRelations {
}
export declare type ShippingOrderWithRelations = ShippingOrder & ShippingOrderRelations;

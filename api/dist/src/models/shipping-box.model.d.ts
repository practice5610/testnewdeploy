import { DistanceUnit } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class ShippingBox extends Entity {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
    merchantId: string;
    name?: string;
    unit: DistanceUnit;
    length: number;
    width: number;
    height: number;
}
export interface ShippingBoxRelations {
}
export declare type ShippingBoxWithRelations = ShippingBox & ShippingBoxRelations;

import { AllOptionalExceptFor, BoomUserBasic, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { FulfillmentStatus } from '../constants';
import { InventoryItem, StoreBasic } from '../models';
export declare class InventoryLease extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    lastChargedAt: number;
    inventoryItem: Partial<InventoryItem>;
    leaseAmount: Money;
    leaseExpiration: number;
    fulfillmentAmount: Money;
    amountPaid: Money;
    merchant: AllOptionalExceptFor<BoomUserBasic, 'uid'>;
    store: StoreBasic;
    fulfillmentStatus: FulfillmentStatus;
    constructor(data?: Partial<InventoryLease>);
}
export interface InventoryLeaseRelations {
}
export declare type InventoryLeaseWithRelations = InventoryLease & InventoryLeaseRelations;

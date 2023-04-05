import { AllOptionalExceptFor, BoomUserBasic, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { InventoryOrderBillingType, InventoryOrderStatus, InventoryOrderType } from '../constants';
import { InventoryItem, Store } from '../models';
export declare class InventoryOrder extends Entity {
    _id?: string;
    createdAt: number;
    updatedAt: number;
    item: InventoryItem;
    status: InventoryOrderStatus;
    billingType: InventoryOrderBillingType;
    orderType: InventoryOrderType;
    amount?: Money;
    merchant: AllOptionalExceptFor<BoomUserBasic, 'uid'>;
    store?: Partial<Store>;
    notes?: string;
    constructor(data?: Partial<InventoryOrder>);
}
export interface InventoryOrderRelations {
}
export declare type InventoryOrderWithRelations = InventoryOrder & InventoryOrderRelations;

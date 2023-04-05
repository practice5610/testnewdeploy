import { InventoryItemInactiveReason, InventoryItemStatus } from '@boom-platform/globals';
import { AllOptionalExceptFor, BoomUserBasic, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Store } from './store.model';
/**
 * Aren't the types of each property supposed to match what is set in globals?
 */
export declare class InventoryItem extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    friendlyID: string;
    itemID?: string;
    itemType: string;
    itemName: string;
    nickname?: string;
    merchant?: AllOptionalExceptFor<BoomUserBasic, 'uid'> | null;
    store?: Partial<Store>;
    status: InventoryItemStatus;
    purchasePrice: Money;
    inactiveReason?: InventoryItemInactiveReason;
    count: number;
    constructor(data?: Partial<InventoryItem>);
}
export interface InventoryItemRelations {
}
export declare type InventoryItemWithRelations = InventoryItem & InventoryItemRelations;

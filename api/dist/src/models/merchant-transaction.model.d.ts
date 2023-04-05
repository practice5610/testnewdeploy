import { AllOptionalExceptFor, BoomUserBasic, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { MerchantTransactionStatus, MerchantTransactionType } from '../constants';
import { InventoryItem, InventoryLease, StoreBasic } from '../models';
/**
 * What do the merchant transactions track specifically? Are these the transactions that merchants process for their stores?
 */
export declare class MerchantTransaction extends Entity {
    _id?: string;
    createdAt: number;
    updatedAt: number;
    title: string;
    status: MerchantTransactionStatus;
    type: MerchantTransactionType;
    salestax?: Money;
    salestaxState?: string;
    amount?: Money;
    merchant: AllOptionalExceptFor<BoomUserBasic, 'uid'>;
    store: StoreBasic;
    purchaseItem: Partial<InventoryItem>;
    inventoryLease?: Partial<InventoryLease>;
    constructor(data?: Partial<MerchantTransaction>);
}
export interface MerchantTransactionRelations {
}
export declare type MerchantTransactionWithRelations = MerchantTransaction & MerchantTransactionRelations;

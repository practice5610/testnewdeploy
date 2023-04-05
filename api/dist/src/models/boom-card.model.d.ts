import { BoomCardStatus } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class BoomCard extends Entity {
    _id: string;
    createdAt: number;
    /**
     * Verify these date descriptions
     * maybe updated date is because the boom card expired? Do boom cards expire?????
     */
    updatedAt: number;
    cardNumber: string;
    pinNumber: number;
    status: BoomCardStatus;
    boomAccountID: string;
    qrcode: string;
    fromBatchId: string;
    storeID?: string;
    storeMerchantID?: string;
    customerID?: string;
    constructor(data?: Partial<BoomCard>);
}
export interface BoomCardRelations {
}
export declare type BoomCardWithRelations = BoomCard & BoomCardRelations;

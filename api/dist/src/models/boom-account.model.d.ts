import { BoomAccountStatus, Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class BoomAccount extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    status: BoomAccountStatus;
    balance: Money;
    customerID: string;
    constructor(data?: Partial<BoomAccount>);
}
export interface BoomAccountRelations {
}
export declare type BoomAccountWithRelations = BoomAccount & BoomAccountRelations;

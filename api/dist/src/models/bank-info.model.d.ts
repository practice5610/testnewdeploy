import { AccountBalanceInfo, AccountOwnerInfo } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class BankInfo extends Entity {
    _id?: string;
    createdAt?: number;
    /**
     * need to see how to describe these dates
     */
    updatedAt?: number;
    plaidID: string;
    accountNumber: string;
    routingNumber: string;
    wireRoutingNumber: string;
    plaidItemID: string;
    plaidAccessToken: string;
    name: string;
    userID: string;
    accountOwner: AccountOwnerInfo;
    balances: Pick<AccountBalanceInfo, 'available' | 'current' | 'limit'>;
    constructor(data?: Partial<BankInfo>);
}
export interface BankInfoRelations {
}
export declare type BankInfoWithRelations = BankInfo & BankInfoRelations;

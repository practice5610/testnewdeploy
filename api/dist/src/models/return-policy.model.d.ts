import { ReturnMethod, TransactionTotalParts } from '@boom-platform/globals/lib/enums/returns';
import { ExtraCosts, ReturnCost } from '@boom-platform/globals/lib/returns';
import { Entity } from '@loopback/repository';
export declare class ReturnPolicyModel extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    merchantID: string;
    name: string;
    description: string;
    refundsAccepted: boolean;
    autoApprove: boolean;
    costsImposed?: ExtraCosts[];
    daysToReturn: number;
    returnMethod: ReturnMethod;
    dropOffAddress?: string[];
    transactionTotalPartsToRefund?: TransactionTotalParts[];
    returnCosts: ReturnCost[];
}
export interface ReturnPolicyRelations {
}
export declare type ReturnPolicyWithRelations = ReturnPolicyModel & ReturnPolicyRelations;

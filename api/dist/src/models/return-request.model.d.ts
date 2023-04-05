import { Money } from '@boom-platform/globals';
import { ReturnMethod, ReturnReason, Status } from '@boom-platform/globals/lib/enums/returns';
import { Entity } from '@loopback/repository';
export declare class ReturnRequestModel extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    customerID: string;
    merchantID: string;
    refundStatus?: Status;
    returnStatus: Status;
    merchantPolicyID: string;
    returnReason: ReturnReason[];
    customReason?: string;
    returnMethod: ReturnMethod;
    purchaseTransactionID: string;
    refundAmount?: Money;
    returnTransactionID: string;
    comment?: string;
}
export interface ReturnRequestRelations {
}
export declare type ReturnRequestWithRelations = ReturnRequestModel & ReturnRequestRelations;

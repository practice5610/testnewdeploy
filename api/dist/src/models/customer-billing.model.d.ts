import { AllOptionalExceptFor } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Transaction } from './transaction.model';
export declare class CustomerBilling extends Entity {
    _id?: string;
    transaction: AllOptionalExceptFor<Transaction, '_id'>;
    plaidAccountId?: string;
    plaidItemId?: string;
    constructor(data?: Partial<CustomerBilling>);
}
export interface CustomerBillingRelations {
}
export declare type CustomerBillingWithRelations = CustomerBilling & CustomerBillingRelations;

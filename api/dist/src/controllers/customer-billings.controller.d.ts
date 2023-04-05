/// <reference types="express" />
import { AllOptionalExceptFor } from '@boom-platform/globals';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { CustomerBilling } from '../models';
import { CustomerBillingRepository, TransactionRepository } from '../repositories';
/**
 * Controller for managing of customer related billing queries
 */
export declare class CustomerBillingsController {
    transactionRepository: TransactionRepository;
    customerBillingRepository: CustomerBillingRepository;
    protected response: Response;
    logger: import("log4js").Logger;
    constructor(transactionRepository: TransactionRepository, customerBillingRepository: CustomerBillingRepository, response: Response);
    /**
     * Gets the customer billing info with optional filter.
     * Customer billings tell the Boom admin what checks have been paid and which are pending creation.
     * @param filter
     */
    find(filter?: Filter<CustomerBilling>): Promise<object>;
    /**
     * Updates the customer billing transaction state
     * @param billings
     */
    updateBillings(billings: AllOptionalExceptFor<CustomerBilling, 'transaction'>[]): Promise<object>;
}

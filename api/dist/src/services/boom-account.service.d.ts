import { APIResponse, Money } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { BoomAccount } from '../models';
import { BoomAccountRepository, TransactionRepository } from '../repositories';
import { ServiceResponse } from '../types/service';
import { ProfileService } from './profile.service';
export declare class BoomAccountService {
    private boomAccountRepository;
    private transactionRepository;
    private profileServices;
    logger: Logger;
    constructor(boomAccountRepository: BoomAccountRepository, transactionRepository: TransactionRepository, profileServices: ProfileService);
    /**
     * Since the Boom Account is not created when new user is created, we need to verify that User can have only 1 boom account at time.
     * @param {string} customerID User UID for verification
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: BoomAccount, error?: Error}
     * @memberof BoomAccountService
     */
    verifyExistingAccounts(customerID: string): Promise<APIResponse<BoomAccount>>;
    /**
     * This method handle charge amount to a customer from his boom account. If cashback it add cashback to the account in same process.
     * @param {string} boomAccountID Boom Account Mongo ID to charge
     * @param {Money} amount Amount to charge
     * @param {Money} cashback Optional cashback amount to add after charge
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    charge(boomAccountID: string, amount: Money, cashback?: Money): Promise<APIResponse<BoomAccount>>;
    /**
     * This method handle add funds to a customer to his boom account.
     * @param {string} boomAccountID Boom Account Mongo ID to charge
     * @param {Money} amount Amount to add
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    addFunds(boomAccountID: string, amount: Money): Promise<APIResponse<BoomAccount>>;
    /**
     * Boom Account Creation Method.
     * @param {string} customerID User UID issues to create a new Boom Account.
     * @param {Money} amount Amount to add
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    create(customerID: string, options?: Options): Promise<APIResponse<BoomAccount>>;
    /**
     * Boom Account updateById Method.
     * @param {string} boomAccountID Boom Account MongoID.
     * @param {BoomAccount} newBoomAccount New Boom Account state to be updated.
     * @param {Options} options Optional.
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}.
     * @memberof BoomAccountService
     */
    updateById(boomAccountID: string, newBoomAccount: BoomAccount, options?: Options): Promise<APIResponse<BoomAccount>>;
    pendingBalance(uid: string): Promise<ServiceResponse<Money>>;
}

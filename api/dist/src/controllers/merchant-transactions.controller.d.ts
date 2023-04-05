/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { MerchantTransaction } from '../models';
import { MerchantTransactionRepository } from '../repositories';
import { MerchantTransactionService } from '../services';
import { ProfileService } from '../services/profile.service';
/**
 * @export
 * @class MerchantTransactionController
 * Controller for Merchant Transaction Operations.
 */
export declare class MerchantTransactionController {
    merchantTransactionRepository: MerchantTransactionRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    merchantTransactionService: MerchantTransactionService;
    profileService: ProfileService;
    logger: import("log4js").Logger;
    constructor(merchantTransactionRepository: MerchantTransactionRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response, merchantTransactionService: MerchantTransactionService, profileService: ProfileService);
    /**
     * Creates a transaction for inventory orders
     * @param {MerchantTransaction} merchantTransaction
     * @returns {(Promise<MerchantTransaction | Response>)}
     * @memberof MerchantTransactionController
     */
    create(merchantTransaction: MerchantTransaction): Promise<MerchantTransaction | Response>;
    /**
     * Update merchant transactions statuses
     * @param {string} id Merchant Transaction id
     * @param {MerchantTransaction} merchantTransaction Merchant Transaction Data
     * @returns {(Promise<void | Response>)}
     * @memberof MerchantTransactionController
     */
    updateById(id: string, merchantTransaction: MerchantTransaction): Promise<void | Response>;
    updateList(list: MerchantTransaction[]): Promise<object>;
    /**
     * Query for merchant transactions
     * @param {Filter<MerchantTransaction>} [filter]
     * @returns {Promise<MerchantTransaction[]>}
     * @memberof MerchantTransactionController
     */
    find(filter?: Filter<MerchantTransaction>): Promise<MerchantTransaction[]>;
}

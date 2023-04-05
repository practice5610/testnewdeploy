/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { BankInfoRepository } from '../repositories/bank-info.repository';
import { BankInfoService, BoomAccountService, ProfileService } from '../services';
/**
 * This controller routes bank account information requests to/from user profiles and our bank account info service
 */
export declare class BankInfoController {
    bankInfoRepository: BankInfoRepository;
    protected response: Response;
    private profileService;
    private boomAccountService;
    private bankInfoService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: import("log4js").Logger;
    constructor(bankInfoRepository: BankInfoRepository, response: Response, profileService: ProfileService, boomAccountService: BoomAccountService, bankInfoService: BankInfoService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    /**
     * Get the environment defined for Plaid on the API environment. Plaid environment and front end environments must match
     */
    getPlaidEnvInfo(): object;
    /**
     * Get Plaid public token to authorize user with the Plaid front-end interface
     * @param req
     */
    getPlaidPublicToken(req: {
        itemId: string;
        uid: string;
    }): Promise<object>;
    exchangeToken(req: {
        publicToken: string;
    }): Promise<object>;
    saveAccounts(req: {
        plaidInfo: any;
        user: AllOptionalExceptFor<BoomUser, 'uid'>;
    }): Promise<any>;
    /**  we access account data from 2 places, customer billings and merchant transactions.
     *
     *    CustomerBillings have a plaidID on them and a userID so we want to check for an account with
     *    both of those things because it is the safest way to make sure we are getting the right account
     *    info. When we call this from the CustomerBillings page we just set the merchant flag to false.
     *
     *    MerchantTransactions do not include a plaidID. Since merchants can only add one bank account,
     *   we can search for an account by userID only. When we call this from the MerchantTransactions page
     *   we can just set the isMerchant flag to true.
     *
     * @param req
     */
    getAccountInfo(req: {
        uid: string;
        accountID: string;
        isMerchant: boolean;
    }): Promise<object>;
    deleteAccount(req: {
        plaidID: string;
        userID: string;
    }[]): Promise<Record<string, any>>;
}

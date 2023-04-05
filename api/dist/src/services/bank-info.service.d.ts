import { APIResponse as APIResponse2, PlaidAuthResult, PlaidIdentityResult } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { BankInfoRepository, CustomerBillingRepository } from '../repositories';
/**
 * Bank info class using Plaid service
 */
export declare class BankInfoService {
    bankInfoRepository: BankInfoRepository;
    customerBillingRepository: CustomerBillingRepository;
    client: any;
    logger: import("log4js").Logger;
    constructor(bankInfoRepository: BankInfoRepository, customerBillingRepository: CustomerBillingRepository);
    getPlaidEnvInfo(): object;
    getPlaidPublicToken(accessToken: string): Promise<object>;
    exchangeToken(publicToken: string): Promise<object>;
    getPlaidBalance(accessToken: string): Promise<object>;
    getAuth(accessToken: string): Promise<APIResponse2<PlaidAuthResult>>;
    getIdentity(accessToken: string): Promise<APIResponse2<PlaidIdentityResult>>;
    deleteAccounts(accounts: {
        plaidID: string;
        userID: string;
    }[], options?: Options): Promise<void>;
}

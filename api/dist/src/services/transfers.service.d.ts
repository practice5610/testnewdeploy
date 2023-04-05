import { AllOptionalExceptFor, Money } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { Transaction } from '../models';
import { TransactionRepository } from '../repositories';
import { BoomAccountService } from './boom-account.service';
import { ProfileService } from './profile.service';
export declare class TransfersService {
    private transactionRepository;
    private profileService;
    private boomAccountService;
    logger: import("log4js").Logger;
    constructor(transactionRepository: TransactionRepository, profileService: ProfileService, boomAccountService: BoomAccountService);
    transferFunds(transaction: AllOptionalExceptFor<Transaction, '_id' | 'sender' | 'receiver' | 'amount'>, options?: Options): Promise<object>;
    addFunds(uid: string, amount: Money, nonce: string, createBillingDoc?: boolean, options?: Options): Promise<{
        transaction: Transaction;
        billingTransaction: Transaction | null;
    }>;
}

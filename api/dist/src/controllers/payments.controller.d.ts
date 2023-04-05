/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser, Money } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { Transaction } from '../models';
import { BoomCardRepository, CustomerBillingRepository, TransactionRepository } from '../repositories';
import { BankInfoRepository } from '../repositories/bank-info.repository';
import { BankInfoService, EmailService, PaymentProcessorService, ProfileService, TransfersService } from '../services';
export declare class PaymentController {
    transactionRepository: TransactionRepository;
    boomCardRepository: BoomCardRepository;
    bankInfoRepository: BankInfoRepository;
    billingRepository: CustomerBillingRepository;
    protected response: Response;
    private transfersService;
    private profileService;
    private emailService;
    private bankInfoService;
    private paymentProcessorService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: import("log4js").Logger;
    constructor(transactionRepository: TransactionRepository, boomCardRepository: BoomCardRepository, bankInfoRepository: BankInfoRepository, billingRepository: CustomerBillingRepository, response: Response, transfersService: TransfersService, profileService: ProfileService, emailService: EmailService, bankInfoService: BankInfoService, paymentProcessorService: PaymentProcessorService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    create(req: {
        nonce: string;
        uid: string;
        plaidItemId: string;
        amount: Money;
        plaidAccountId: string;
    }): Promise<Transaction | object>;
    ProcessCreditCardPayment(req: {
        amount: Money;
        ksn: string;
        EMVSREDData: string;
        numberOfPaddedBytes: string;
        userEmail: string;
        userFirstName: string;
        userLastName: string;
        userUid: string;
    }): Promise<object>;
}

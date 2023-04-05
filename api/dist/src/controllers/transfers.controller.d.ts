/// <reference types="express" />
import { APIResponse } from '@boom-platform/globals';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Transaction } from '../models';
import { TransactionRepository } from '../repositories';
import { BoomAccountService, EmailService, ProfileService, SNSService, TransfersService } from '../services';
export declare class TransferController {
    transactionRepository: TransactionRepository;
    protected response: Response;
    private transfersService;
    private profileService;
    private emailService;
    private snsService;
    private boomAccountService;
    logger: Logger;
    constructor(transactionRepository: TransactionRepository, response: Response, transfersService: TransfersService, profileService: ProfileService, emailService: EmailService, snsService: SNSService, boomAccountService: BoomAccountService);
    create(transaction: Transaction): Promise<APIResponse<Transaction | object>>;
    count(where?: Where<Transaction>): Promise<Count>;
    find(filter?: Filter<Transaction>): Promise<Transaction[]>;
    updateById(id: string, transaction: Transaction): Promise<APIResponse<object>>;
}

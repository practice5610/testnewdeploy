/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Transaction } from '../models';
import { TransactionRepository } from '../repositories';
export declare class WithdrawalController {
    transactionRepository: TransactionRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    logger: Logger;
    constructor(transactionRepository: TransactionRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    create(transaction: Omit<Transaction, '_id' | 'booking' | 'cashback' | 'commissionCollected' | 'createdAt' | 'dateReceived' | 'purchaseItem' | 'updatedAt' | 'type' | 'title' | 'sender' | 'shippingOrderId' | 'nonce' | 'salestax' | 'shortId' | 'status' | 'taxcode'>): Promise<Response<Transaction>>;
    count(incomingWhere?: Where<Transaction>): Promise<Response<Count>>;
    find(incomingFilter?: Filter<Transaction>): Promise<Response<Transaction[]>>;
    findById(id: string, incomingFilter?: FilterExcludingWhere<Transaction>): Promise<Response<Transaction>>;
    updateById(id: string, transaction: Transaction): Promise<void>;
}

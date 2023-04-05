/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Transaction } from '../models';
import { BoomCardRepository, ShippingOrderRepository, TransactionRepository } from '../repositories';
export declare class TransactionController {
    transactionRepository: TransactionRepository;
    shippingOrderRepository: ShippingOrderRepository;
    boomCardRepository: BoomCardRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    constructor(transactionRepository: TransactionRepository, shippingOrderRepository: ShippingOrderRepository, boomCardRepository: BoomCardRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    find(filter?: Filter<Transaction>): Promise<Transaction[]>;
    replaceById(id: string, transaction: Transaction): Promise<void>;
    deleteById(id: string): Promise<void>;
    findAll(filter?: Filter<Transaction>): Promise<Transaction[]>;
    /**
     * This used to add tracking onto a transaction but now it adds tracking to a shipping order
     * @param id _id of the transaction to add shipping info to
     * @param transactionItem the tracking link and/or the tracking number to be added
     */
    addTracking(id: string, trackingInfo: {
        trackingNumber?: string;
        trackingLink?: string;
    }): Promise<void>;
}

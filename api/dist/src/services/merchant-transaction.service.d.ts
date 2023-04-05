import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { MerchantTransaction } from '../models';
import { InventoryItemRepository, InventoryLeaseRepository, MerchantTransactionRepository } from '../repositories';
import { APIResponse } from '../types';
export declare class MerchantTransactionService {
    inventoryItemRepository: InventoryItemRepository;
    inventoryLeaseRepository: InventoryLeaseRepository;
    merchantTransactionRepository: MerchantTransactionRepository;
    logger: Logger;
    constructor(inventoryItemRepository: InventoryItemRepository, inventoryLeaseRepository: InventoryLeaseRepository, merchantTransactionRepository: MerchantTransactionRepository);
    /**
     * Updates merchant transaction, inventorylease and inventoryItem when the Type is Return and Status Completed
     * @param {string | null} id
     * @param {MerchantTransaction | null} merchantTransaction
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling
     * this method.
     * @returns {Promise<APIResponse>}
     * @memberof MerchantTransactionService
     */
    updateMerchantTransaction(id: string | null, merchantTransaction: MerchantTransaction | null, options?: Options): Promise<APIResponse>;
    createMerchantTransactions(merchantTransactions: MerchantTransaction[], options?: Options): Promise<APIResponse>;
}

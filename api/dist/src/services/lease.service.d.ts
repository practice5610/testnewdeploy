import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { InventoryItem, InventoryLease } from '../models';
import { InventoryItemRepository, InventoryLeaseRepository, MerchantTransactionRepository } from '../repositories';
import { EmailService } from '../services';
import { MerchantTransactionService } from '../services';
export declare class LeaseService {
    inventoryLeaseRepository: InventoryLeaseRepository;
    inventoryItemRepository: InventoryItemRepository;
    merchantTransactionRepository: MerchantTransactionRepository;
    private emailService;
    merchantTransactionService: MerchantTransactionService;
    logger: Logger;
    constructor(inventoryLeaseRepository: InventoryLeaseRepository, inventoryItemRepository: InventoryItemRepository, merchantTransactionRepository: MerchantTransactionRepository, emailService: EmailService, merchantTransactionService: MerchantTransactionService);
    /**
     * Called by a cron function to create the transactions remaining for each Lease
     * @param {Options} [options]
     * @return {*}  {Promise<any>}
     * @memberof LeaseService
     */
    reviewInventoryLeases(options?: Options): Promise<any>;
    swapItems(oldItem: InventoryItem, newItem: InventoryItem, newLease: InventoryLease): Promise<void>;
}

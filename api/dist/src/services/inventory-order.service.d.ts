import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { InventoryOrder } from '../models';
import { InventoryItemRepository, InventoryOrderRepository, MerchantTransactionRepository } from '../repositories';
import { InventoryOrderResult } from '../types';
export declare class InventoryOrderService {
    inventoryOrderRepository: InventoryOrderRepository;
    merchantTransactionRepository: MerchantTransactionRepository;
    inventoryItemRepository: InventoryItemRepository;
    logger: Logger;
    constructor(inventoryOrderRepository: InventoryOrderRepository, merchantTransactionRepository: MerchantTransactionRepository, inventoryItemRepository: InventoryItemRepository);
    /**
     * Creates inventory orders and merchant transactions,
     * so when an inventory item is ordered, a record of an inventory order and a merchant transaction with 'pending' status is created
     * @param {(BoomUserBasic | null)} merchant A merchant orders inventory items
     * @param {(InventoryOrder[] | null)} orders orders contain order information
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling this method.
     * @returns {Promise<InventoryOrderResult>}
     * @memberof InventoryOrderService
     */
    createInventoryOrders(orders: InventoryOrder[] | null, options?: Options): Promise<InventoryOrderResult>;
    updateInventoryOrders(orders: Partial<InventoryOrder>[]): Promise<void>;
}

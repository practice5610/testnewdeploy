/// <reference types="express" />
import { InventoryItemInactiveReason } from '@boom-platform/globals';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { InventoryLease } from '../models';
import { InventoryItemRepository, InventoryLeaseRepository } from '../repositories';
import { LeaseService } from '../services';
export declare class InventoryLeasesController {
    inventoryLeaseRepository: InventoryLeaseRepository;
    inventoryItemRepository: InventoryItemRepository;
    leaseService: LeaseService;
    protected response: Response;
    constructor(inventoryLeaseRepository: InventoryLeaseRepository, inventoryItemRepository: InventoryItemRepository, leaseService: LeaseService, response: Response);
    /**
     * Gets a list of all inventory leases
     * @param filter filters the leases to return
     */
    find(filter?: Filter<InventoryLease>): Promise<object>;
    /**
     * Updates the Inventory Leases fuilfilment state
     * @param leases
     */
    updateLeases(leases: any[]): Promise<object>;
    replace(body: {
        item: InventoryLease;
        reason: InventoryItemInactiveReason;
    }): Promise<object>;
}

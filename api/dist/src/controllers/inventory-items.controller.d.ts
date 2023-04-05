/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { InventoryItem } from '../models';
import { InventoryItemRepository } from '../repositories';
import { ProfileService } from '../services/profile.service';
export declare class InventoryItemsController {
    inventoryItemRepository: InventoryItemRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    profileService: ProfileService;
    constructor(inventoryItemRepository: InventoryItemRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response, profileService: ProfileService);
    create(inventoryItem: InventoryItem): Promise<InventoryItem | Response>;
    updateById(id: string, inventoryItem: InventoryItem): Promise<void | Response>;
    updateList(list: any[]): Promise<void | Response>;
    find(filter?: Filter<InventoryItem>): Promise<InventoryItem[]>;
}

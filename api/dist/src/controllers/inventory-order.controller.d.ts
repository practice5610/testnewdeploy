/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { InventoryOrder } from '../models';
import { InventoryOrderRepository } from '../repositories';
import { InventoryOrderService } from '../services';
export declare class IventoryOrderController {
    inventoryOrderRepository: InventoryOrderRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    inventoryOrderService: InventoryOrderService;
    logger: Logger;
    constructor(inventoryOrderRepository: InventoryOrderRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response, inventoryOrderService: InventoryOrderService);
    create(inventoryOrders: InventoryOrder[]): Promise<void | Response>;
    count(where?: Where<InventoryOrder>): Promise<Response<Count>>;
    updateById(id: string, body: Partial<InventoryOrder>): Promise<void | Response>;
    updateList(list: Partial<InventoryOrder>[]): Promise<void | Response>;
    find(filter?: Filter<InventoryOrder>): Promise<InventoryOrder[]>;
}

/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Order } from '../models';
import { OrderService } from '../services';
export declare class OrderController {
    orderService: OrderService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    logger: Logger;
    constructor(orderService: OrderService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    count(where?: Where<Order>): Promise<Response<Count>>;
    find(incomingFilter?: Filter<Order>): Promise<Response<Order[]>>;
    findById(id: string, filter?: FilterExcludingWhere<Order>): Promise<Response<Order>>;
    updateById(id: string, order: Order): Promise<Response<void>>;
}

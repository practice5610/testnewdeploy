import { APIResponse } from '@boom-platform/globals';
import { Count, Filter, FilterExcludingWhere, Options, Where } from '@loopback/repository';
import { Logger } from 'log4js';
import { Order } from '../models';
import { OrderRepository } from '../repositories/order.repository';
import { ServiceResponse } from '../types/service';
export declare class OrderService {
    orderRepository: OrderRepository;
    logger: Logger;
    constructor(orderRepository: OrderRepository);
    create(order: Order, options?: Options): Promise<APIResponse<Order>>;
    countOrders(where: Where<Order> | undefined): Promise<ServiceResponse<Count>>;
    findOrders(filter: Filter<Order>): Promise<ServiceResponse<Order[]>>;
    findOrderById(id: string, filter: FilterExcludingWhere<Order> | undefined): Promise<ServiceResponse<Order>>;
    updateOrderById(id: string, order: Order): Promise<ServiceResponse<Order>>;
}

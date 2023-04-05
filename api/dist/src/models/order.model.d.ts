import { AddressInfo } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { OrderGroup } from '../types/shipping';
import { Transaction } from './transaction.model';
export declare class Order extends Entity {
    _id?: string;
    createdAt: number;
    updatedAt: number;
    orderGroups: OrderGroup[];
    shipToAddress: AddressInfo;
    customerUID: string;
    transactions?: Transaction[];
    constructor(data?: Partial<Order>);
}
export interface OrderRelations {
}
export declare type OrderWithRelations = Order & OrderRelations;

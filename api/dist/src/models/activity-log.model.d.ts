import { BoomUser } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { ActivityLogOperation, ActivityLogOperatorRole } from '../constants';
import { InventoryLease } from './inventory-lease.model';
import { InventoryOrder } from './inventory-order.model';
import { Transaction } from './transaction.model';
export declare class ActivityLog extends Entity {
    _id?: string;
    createdAt: number;
    updatedAt: number;
    /**How do I make the name and description for this one? */
    documents?: (InventoryOrder | Transaction | InventoryLease)[];
    operation: ActivityLogOperation;
    /**What should I put for this description? I'm not sure what user we will have */
    user?: BoomUser;
    operatorRole: ActivityLogOperatorRole;
    constructor(data?: Partial<ActivityLog>);
}
export interface ActivityLogRelations {
}
export declare type ActivityLogWithRelations = ActivityLog & ActivityLogRelations;

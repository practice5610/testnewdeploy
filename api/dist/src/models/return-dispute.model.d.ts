import { ReturnRequest } from '@boom-platform/globals/lib/returns';
import { Entity } from '@loopback/repository';
export declare class ReturnDisputeModel extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    returnRequest: ReturnRequest;
    isOpen: boolean;
    comment: string;
}
export interface ReturnDisputeRelations {
}
export declare type ReturnDisputeWithRelations = ReturnDisputeModel & ReturnDisputeRelations;

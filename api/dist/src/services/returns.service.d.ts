import { AllOptionalExceptFor, BoomUser, ReturnDispute, ReturnPolicy, ReturnRequest } from '@boom-platform/globals';
import { Filter, Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { ReturnDisputeModel, ReturnRequestModel } from '../models';
import { ReturnDisputeRepository, ReturnPolicyRepository, ReturnRequestRepository, ShippingOrderRepository, TransactionRepository } from '../repositories';
import { ServiceResponse } from '../types';
export declare class ReturnService {
    returnPolicyRepository: ReturnPolicyRepository;
    transactionRepository: TransactionRepository;
    shippingOrderRepository: ShippingOrderRepository;
    returnRequestRepository: ReturnRequestRepository;
    returnDisputeRepository: ReturnDisputeRepository;
    logger: Logger;
    constructor(returnPolicyRepository: ReturnPolicyRepository, transactionRepository: TransactionRepository, shippingOrderRepository: ShippingOrderRepository, returnRequestRepository: ReturnRequestRepository, returnDisputeRepository: ReturnDisputeRepository);
    /**
     * Create return policies
     */
    createReturnPolicy(newReturnPolicy: ReturnPolicy): Promise<ServiceResponse<ReturnPolicy>>;
    /**
     * find policies by id or merchant id
     */
    getReturnPolicies(id: string): Promise<ServiceResponse<ReturnPolicy[]>>;
    /**
     * Delete Return Policies
     */
    deleteById(id: string): Promise<ServiceResponse<ReturnPolicy>>;
    /**
     * Create return request
     */
    createReturnRequest(newReturnRequest: ReturnRequest, options?: Options): Promise<ServiceResponse<ReturnRequest>>;
    /**
     * Find return requeust
     */
    getReturnRequest(filter: Filter<ReturnRequestModel>): Promise<ServiceResponse<ReturnRequest[]>>;
    /**
     * Update return request
     */
    updateReturnRequest(id: string, returnRequest: ReturnRequest, currentUser: AllOptionalExceptFor<BoomUser, 'roles' | 'uid'>, options?: Options): Promise<ServiceResponse<ReturnRequest>>;
    /**
     * Create Return Dispute
     */
    createDispute(newDispute: ReturnDispute): Promise<ServiceResponse<ReturnDispute>>;
    /**
     * Find Return Dispute by ID
     */
    getDisputeByID(filter: Filter<ReturnDisputeModel>): Promise<ServiceResponse<ReturnDispute[]>>;
    /**
     * Update Return Dispute
     */
    updateDispute(id: string, dispute: ReturnDispute, options?: Options): Promise<ServiceResponse<ReturnDispute>>;
}

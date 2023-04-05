/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser, ReturnDispute, ReturnPolicy, ReturnRequest } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { ReturnRequestModel } from '../models';
import { ReturnService } from '../services/returns.service';
export declare class ReturnsController {
    protected response: Response;
    returnService: ReturnService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: Logger;
    constructor(response: Response, returnService: ReturnService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    /**
     * POST a new Return Policy
     * @param policy new policy to add to database
     */
    createPolicy(policy: ReturnPolicy): Promise<Response<APIResponse<ReturnPolicy>>>;
    /**
     * GET all the policies a merchant has or a specific policy by id
     */
    getReturnPolicies(id: string): Promise<Response<APIResponse<ReturnPolicy>>>;
    /**
     * DELETE Policy by ID
     */
    deleteById(id: string): Promise<Response<APIResponse<ReturnPolicy>>>;
    /**
     * POST new Return Request
     */
    createReturnRequest(returnRequest: ReturnRequest): Promise<Response<APIResponse<ReturnRequest>>>;
    /**
     * GET Return Requests by ID
     */
    getReturnRequest(requestFilter?: Filter<ReturnRequestModel>): Promise<Response<APIResponse<ReturnRequest[]>>>;
    /**
     * PATCH Return Request
     */
    updateRequestById(id: string, returnRequest: ReturnRequest): Promise<Response<APIResponse<ReturnRequest>>>;
    /**
     * POST Dispute
     */
    createDispute(dispute: ReturnDispute): Promise<Response<APIResponse<ReturnDispute>>>;
    /**
     * GET Dispute by ID
     */
    getDisputeByID(id: string): Promise<Response<APIResponse<ReturnDispute>>>;
    /**
     * PATCH Dispute
     */
    updateDisputeByID(id: string, dispute: ReturnDispute): Promise<Response<APIResponse<ReturnDispute>>>;
}

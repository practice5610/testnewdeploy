/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { BoomAccount } from '../models';
import { BoomAccountRepository } from '../repositories';
import { BoomAccountService, ProfileService } from '../services';
export declare class BoomAccountController {
    boomAccountRepository: BoomAccountRepository;
    protected response: Response;
    private profileService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'>>;
    boomAccountService: BoomAccountService;
    logger: Logger;
    constructor(boomAccountRepository: BoomAccountRepository, response: Response, profileService: ProfileService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'>>, boomAccountService: BoomAccountService);
    /**
     * Finds a boom account by its database ID
     * @param {string} id MongoDB Object ID
     * @returns {Promise<BoomAccount>} Promise BoomAccount
     * @memberof BoomAccountController
     */
    findById(id: string): Promise<APIResponse<BoomAccount>>;
    /**
     * Get the balance from specific user by his UID
     * @param {string} uid Boom user id.
     * @returns {Promise<Response>} Promise BoomAccount
     * @memberof BoomAccountController
     */
    findByUserId(uid: string): Promise<Response>;
}

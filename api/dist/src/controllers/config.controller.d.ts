/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser, Config } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Config as ConfigModel } from '../models';
import { ConfigRepository } from '../repositories';
/**
 * @export
 * @class ConfigController
 * Controller for global configuration updates.
 */
export declare class ConfigController {
    configRepository: ConfigRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    logger: Logger;
    constructor(configRepository: ConfigRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    create(config: Omit<Required<Config>, 'createdAt' | 'updatedAt' | '_id'>): Promise<Response<APIResponse<Config>>>;
    find(filter?: Filter<ConfigModel>): Promise<Response<APIResponse<Config>>>;
    updateById(id: string, config: Omit<Config, 'createdAt' | 'updatedAt' | '_id'>): Promise<Response>;
    deleteById(id: string): Promise<Response>;
}

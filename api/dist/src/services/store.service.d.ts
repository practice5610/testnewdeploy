import { APIResponse } from '@boom-platform/globals';
import { Logger } from 'log4js';
import { Store } from '../models';
import { StoreRepository } from '../repositories';
export declare class StoreService {
    storeRepository: StoreRepository;
    logger: Logger;
    constructor(storeRepository: StoreRepository);
    findStoreById(id: string): Promise<APIResponse<Store>>;
}

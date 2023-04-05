/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Store } from '../models';
import { OfferRepository, ProductRepository, ReviewRepository, StoreRepository } from '../repositories';
import { ProfileService, SearchEngineService } from '../services';
export declare class StoreController {
    storeRepository: StoreRepository;
    productRepository: ProductRepository;
    offerRepository: OfferRepository;
    reviewRepository: ReviewRepository;
    protected response: Response;
    searchEngineService: SearchEngineService;
    profileService: ProfileService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: import("log4js").Logger;
    constructor(storeRepository: StoreRepository, productRepository: ProductRepository, offerRepository: OfferRepository, reviewRepository: ReviewRepository, response: Response, searchEngineService: SearchEngineService, profileService: ProfileService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    create(store: Store): Promise<Response>;
    count(where?: Where<Store>): Promise<Response>;
    find(filter?: Filter<Store>): Promise<Response>;
    findById(id: string): Promise<Response>;
    deleteById(id: string): Promise<Response>;
    updateStoreById(incomingStore: Store, id: string): Promise<void | Response>;
}

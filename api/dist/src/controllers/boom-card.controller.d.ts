/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { BoomCard } from '../models';
import { BoomCardRepository, StoreRepository } from '../repositories';
import { BoomAccountService, BoomCardService } from '../services';
import { ProfileService } from '../services/profile.service';
export declare class BoomCardController {
    boomCardRepository: BoomCardRepository;
    storeRepository: StoreRepository;
    protected response: Response;
    private profileService;
    private boomAccountService;
    private boomCardService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: Logger;
    constructor(boomCardRepository: BoomCardRepository, storeRepository: StoreRepository, response: Response, profileService: ProfileService, boomAccountService: BoomAccountService, boomCardService: BoomCardService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    /**
     * Creates new Boom card records
     * @param {BoomCard[]} boomCards
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    create(boomCards: BoomCard[]): Promise<Response<APIResponse<BoomCard[]>>>;
    /**
     * Gets the count of all stored Boom cards
     * @param {Where<BoomCard>} [where]
     * @returns {Promise<Count>}
     * @memberof BoomCardController
     */
    count(where?: Where<BoomCard>): Promise<Response<APIResponse<Count>>>;
    /**
     * Get all Boom cards or by filter
     * @param {Filter<BoomCard>} [filter]
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    find(filter?: Filter<BoomCard>): Promise<Response<APIResponse<BoomCard[]>>>;
    /**
     * Finds a boom card by its database ID
     * @param {string} id
     * @returns {Promise<BoomCard>}
     * @memberof BoomCardController
     */
    findById(id: string): Promise<Response<APIResponse<BoomCard>>>;
    /**
     * Finds card by the card number
     * @param {string} cardNumber The card number printed on the front of the card
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    findByCardNumber(cardNumber: string): Promise<Response<APIResponse<BoomCard[]>>>;
    /**
     * Assigns a boom card to a particular Boom user
     * @param {string} id The card number printed on the front of the card OR the MongoDB ID of the card record
     * @param {{ pinNumber: number; uid: string }} data The pin number and customer uid
     * @returns {Promise<BoomCard>}
     * @memberof BoomCardController
     */
    activate(id: string, data: {
        pinNumber: number;
        uid: string;
        boomAccountID: string;
        storeId: string;
    }): Promise<Response<APIResponse<BoomCard>>>;
    /**
     * Updates a Boom card
     * @param {string} id
     * @param {BoomCard} boomCard
     * @returns {Promise<void>}
     * @memberof BoomCardController
     */
    updateById(id: string, boomCard: BoomCard): Promise<Response>;
    /** // TODO: review this endpoint about Boom Business Logic, i don't see any reason to delete a boomcard instance, also the record is not removed from Firestore user profile.
     * Deletes a Boom card
     * @param {string} id
     * @returns {Promise<void>}
     * @memberof BoomCardController
     */
    deleteById(id: string): Promise<Response>;
    /**
     * Login endpoint for Boom cards. Will return a firebase token that can be used to authenticate with the API
     * @param {{ cardNumber: string; pinNumber: string }} data The Boom card number and pin
     * @returns {(Promise<string | Response>)}
     * @memberof BoomCardController
     */
    login(data: {
        cardNumber: string;
        pinNumber: number;
    }): Promise<Response<APIResponse<string>>>;
}

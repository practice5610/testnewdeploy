/// <reference types="express" />
import { AddressInfo, AllOptionalExceptFor, BoomUser, EstimateRateRequest, GetRatesRequest, PurchaseRateRequest } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Filter } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { ShippingBox, ShippingPolicy } from '../models';
import { ShippingBoxRepository, ShippingOrderRepository, ShippingPolicyRepository } from '../repositories';
import { ShippingService } from '../services';
import { ShippingCheckoutRequest } from '../types';
export declare class ShippingController {
    protected response: Response;
    shippingOrderRepository: ShippingOrderRepository;
    shippingPolicyRepository: ShippingPolicyRepository;
    shippingBoxRepository: ShippingBoxRepository;
    shippingService: ShippingService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    logger: Logger;
    constructor(response: Response, shippingOrderRepository: ShippingOrderRepository, shippingPolicyRepository: ShippingPolicyRepository, shippingBoxRepository: ShippingBoxRepository, shippingService: ShippingService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    /**
     * Validate an address and add it to shippo
     * @param address
     */
    validate(address: AllOptionalExceptFor<AddressInfo, 'name' | 'street1' | 'city' | 'state' | 'zip' | 'country'>): Promise<Response>;
    /**
     * get rates from specific packages to a specific destination
     *
     * @param body.addressTo the shippo id of the address
     * @param body.addressFrom the shippo id of the address
     * @param body.parcels a list of all parcels to ship
     * @param body.extra extra shipping options, like signature required
     * @param body.returnAll true if you want to return all rates
     * @param body.shipmentMethods a list of services to be included in the rates returned. If
     *                            this is set, ONLY the cheapest rate and the rates listed will be returned
     */
    getRates(body: GetRatesRequest): Promise<Response>;
    /**
     * purchase a label and return the Shippo transaction object_id
     *
     * @param body.rate the rate to buy
     * @param body.purchaser the uid of the account paying for shipping
     * @param body.labelFileType the file type for the label. Default is set in Shippo settings
     *
     * @returns the _id of the new ShippingOrder
     */
    purchase(body: PurchaseRateRequest): Promise<Response>;
    /**
     * Get full shippo transaction details for a given shippo transaction or ShippingOrder
     *
     * @param id the shippo_id of the transaction, or the _id of the ShippingOrder
     */
    getTransaction(id: string): Promise<Response>;
    /**
     * Get all labels for a given shippo transaction. There is usually only one
     * label per transaction but sometimes multiple parcels from the same sender can each have
     * a label within the same transaction
     *
     * @param id the shippo_id of the transaction
     */
    getLabels(id: string): Promise<Response>;
    /**
     * Refund an unused label (transaction)
     *
     * @param transaction the shippo transaction to refund (shippo_id)
     */
    refund(transaction: string): Promise<Response>;
    /**
     * Estimate the cost of a shipping service level
     */
    estimate(body: EstimateRateRequest): Promise<Response>;
    /**
     * This gets a ShippingOrder document by id
     * @param id _id of the ShippingOrder
     */
    getShippingOrder(id: string): Promise<Response>;
    /**
     * Post a new ShippingPolicy
     *
     * @param policy new policy to add to database
     */
    createPolicy(policy: ShippingPolicy): Promise<Response>;
    /**
     * Get a ShippingPolicy by id
     */
    getShippingPolicy(id: string): Promise<Response>;
    /**
     * Get a ShippingPolicies
     */
    findShippingPolicies(filter?: Filter<ShippingPolicy>): Promise<Response>;
    /**
     * organize bookings into shipable groups and get rates for those groups
     */
    checkout(body: ShippingCheckoutRequest): Promise<Response>;
    /**
     * Post a new Shipping Box
     *
     * @param box new shipping box to add to database
     */
    createBox(box: ShippingBox): Promise<Response>;
    /**
     * Get Shipping Box list
     *
     */
    findBox(filter?: Filter<ShippingBox>): Promise<Response>;
}

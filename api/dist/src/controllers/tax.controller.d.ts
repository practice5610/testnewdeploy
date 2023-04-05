/// <reference types="express" />
import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { BookingService, ProfileService } from '../services';
import { TaxService } from '../services/tax.service';
import { Nexus, TaxAddress } from '../types';
export declare class TaxController {
    protected response: Response;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    profileService: ProfileService;
    bookingService: BookingService;
    taxService: TaxService;
    logger: Logger;
    constructor(response: Response, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, profileService: ProfileService, bookingService: BookingService, taxService: TaxService);
    /**
     * Get all sales tax per item
     * @param item
     */
    getTax(item: {
        id: string;
        toAddress: TaxAddress;
    }[]): Promise<Response>;
    setTaxableStates(nexus: Nexus[]): Promise<void>;
}

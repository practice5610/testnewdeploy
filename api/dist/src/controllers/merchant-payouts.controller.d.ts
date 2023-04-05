/// <reference types="express" />
import { Response } from '@loopback/rest';
/**
 * Controller for managing of payouts for merchants (accounts payable)
 */
export declare class MerchantPayoutsController {
    protected response: Response;
    logger: import("log4js").Logger;
    constructor(response: Response);
    findMerchants(keyword?: string): Promise<object>;
}

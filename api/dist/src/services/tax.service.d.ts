import { APIResponse, Money } from '@boom-platform/globals';
import { TaxForOrderRes } from 'taxjar/dist/types/returnTypes';
import { Nexus } from '../types/tax';
import { TaxAddress } from '../types/tax-address';
export declare class TaxService {
    logger: import("log4js").Logger;
    client: any;
    constructor();
    getTotalTaxByProduct(fromAddress: TaxAddress, toAddress: TaxAddress, nexus: Nexus[], price: Money): Promise<APIResponse<TaxForOrderRes>>;
}

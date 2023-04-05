import { Money } from '@boom-platform/globals';
import { Model } from '@loopback/repository';
export declare class FundingRequest extends Model {
    uid: string;
    nonce: string;
    amount: Money;
    publicToken: string;
    plaidAccessToken: string;
    plaidAccountId: string;
    constructor(data?: Partial<FundingRequest>);
}
export interface FundingRequestRelations {
}
export declare type FundingRequestWithRelations = FundingRequest & FundingRequestRelations;

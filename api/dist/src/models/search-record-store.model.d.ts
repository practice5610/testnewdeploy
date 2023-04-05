import { AllOptionalExceptFor, BoomUser, StoreTypes } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class SearchRecordStore extends Entity {
    id?: string;
    createdAt?: number;
    /**
     * Are these date pertaining to the store or the search? I think store
     */
    updatedAt?: number;
    companyLogoUrl?: string;
    coverImageUrl?: string;
    companyType?: string;
    companyName?: string;
    companyDescription?: string;
    years?: number;
    storeType?: StoreTypes;
    links?: string[];
    emails?: string[];
    phoneNumber?: string;
    number?: string;
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    _tags?: string[];
    _geoloc: {
        lat: number;
        lon: number;
    };
    openingTime?: string;
    closingTime?: string;
    days?: string[];
    merchant?: AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName'>;
    constructor(data?: Partial<SearchRecordStore>);
}
export interface SearchRecordStoreRelations {
}
export declare type SearchRecordStoreWithRelations = SearchRecordStore & SearchRecordStoreRelations;

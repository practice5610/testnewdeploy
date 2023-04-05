import { AllOptionalExceptFor, BoomUser, Geolocation, StoreTypes } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class StoreBasic extends Entity {
    _id: string;
    companyName: string;
    emails: string[];
    phoneNumber: string;
    number: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
export declare class Store extends StoreBasic {
    pin?: number;
    objectID?: string;
    createdAt: number;
    updatedAt: number;
    companyLogoUrl: string;
    coverImageUrl: string;
    companyType: string;
    companyDescription: string;
    fein: number;
    years: number;
    storeType: StoreTypes;
    links: string[];
    _tags: string[];
    _geoloc: Geolocation;
    openingTime: number;
    closingTime: number;
    days: string[];
    merchant: AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName'>;
    constructor(data?: Partial<Store>);
}
export interface StoreRelations {
}
export declare type StoreWithRelations = Store & StoreRelations;

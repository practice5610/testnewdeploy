import { Money } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
export declare class SearchRecordProduct extends Entity {
    productID: string;
    id: string;
    categoryName: string;
    subCategoryName: string;
    hasOffer: boolean;
    _geoloc: {
        lat: number;
        lon: number;
    };
    offer: object;
    priceNum: number;
    createdAt: number;
    updatedAt: number;
    imageUrl: string;
    merchantUID: string;
    category: object;
    name: string;
    description: string;
    store: {
        _id: string;
        number: string;
        street1: string;
        street2?: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    price: Money;
    attributes?: object;
    _tags: string[];
    constructor(data?: Partial<SearchRecordProduct>);
}
export interface SearchRecordProductRelations {
}
export declare type SearchRecordProductWithRelations = SearchRecordProduct & SearchRecordProductRelations;

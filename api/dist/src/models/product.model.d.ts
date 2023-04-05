import { Money, PackageDetails, ProductStatus } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Category } from './category.model';
import { Store } from './store.model';
export declare class Product extends Entity {
    _id?: string;
    objectID?: string;
    createdAt?: number;
    updatedAt?: number;
    imageUrl?: string;
    merchantUID: string;
    category: Category;
    name?: string;
    description?: string;
    store: Partial<Store>;
    price: Money;
    attributes?: object;
    _tags?: string[];
    shippingPolicy: string;
    packageDetails?: PackageDetails;
    status: ProductStatus;
    quantity?: number;
    returnPolicy: string;
    constructor(data?: Partial<Product>);
}
export interface ProductRelations {
}
export declare type ProductWithRelations = Product & ProductRelations;

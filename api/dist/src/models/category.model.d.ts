import { Entity } from '@loopback/repository';
export declare class Category extends Entity {
    _id: string;
    createdAt: number;
    updatedAt: number;
    name: string;
    commissionRate: number;
    subCategories: string[];
    constructor(data?: Partial<Category>);
}
export interface CategoryRelations {
}
export declare type CategoryWithRelations = Category & CategoryRelations;

import { Entity } from '@loopback/repository';
export declare class Image extends Entity {
    _id: string;
    uploadedBy: string;
    fileName: string;
    path: string;
    createdAt: 'date';
    /**
     * Why do both of these have functions in them? This file is setup differently from the rest
     */
    modifiedAt: 'date';
    constructor(data?: Partial<Image>);
}
export interface ImageRelations {
}
export declare type ImageWithRelations = Image & ImageRelations;

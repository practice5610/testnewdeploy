import { AdminConfigType } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
/**
 * double check all of these as I have no idea what config is supposed to be...
 */
export declare class Config extends Entity {
    _id: string;
    createdAt: number;
    /**
     * Do configs get created? What are they?
     */
    updatedAt: number;
    type: AdminConfigType;
    label: string;
    value: number | {
        [key: string]: any;
    };
    constructor(data?: Partial<Config>);
}
export interface ConfigRelations {
}
export declare type ConfigWithRelations = Config & ConfigRelations;

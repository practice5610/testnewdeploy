import { AllOptional, BoomUser, RoleKey } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
import { FirebaseFilter } from '../../types';
export declare type FilterAdminUsersType = FirebaseFilter<AllOptional<Pick<BoomUser, 'uid' | 'hasCards'>> & {
    roles?: [RoleKey.Member | RoleKey.Merchant];
    createdAt?: string;
}>;
export declare const FilterAdminUsersSchemaObject: SchemaObject;

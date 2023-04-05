import { RoleKey } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
export declare type VerifyPhoneNumberType = {
    firstName: string;
    lastName: string;
    phone: string;
};
export declare const VerifyPhoneNumberSchemaObject: SchemaObject;
export declare type CreateUserType = {
    email: string;
    password: string;
    roles: RoleKey[];
};
export declare const CreateUserSchemaObject: SchemaObject;

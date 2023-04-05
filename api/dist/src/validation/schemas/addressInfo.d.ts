import { SchemaObject } from '@loopback/openapi-v3';
export declare const AddressInfoSchema: {
    readonly type: "object";
    readonly description: "AddressInfo";
    readonly properties: {
        readonly object_id: {
            readonly type: "string";
        };
        readonly is_complete: {
            readonly type: "boolean";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name of the person at this address";
            readonly minLength: 1;
            readonly maxLength: 35;
        };
        readonly number: {
            readonly type: "string";
            readonly description: "Address number. This can be provided here or in street1";
            readonly minLength: 1;
            readonly maxLength: 35;
        };
        readonly street1: {
            readonly type: "string";
            readonly description: "Street line 1";
            readonly minLength: 1;
            readonly maxLength: 35;
        };
        readonly street2: {
            readonly type: "string";
            readonly description: "Street line 2";
            readonly minLength: 1;
            readonly maxLength: 35;
        };
        readonly city: {
            readonly type: "string";
            readonly description: "city";
            readonly minLength: 1;
            readonly maxLength: 35;
        };
        readonly state: {
            readonly type: "string";
            readonly description: "2 letter state code";
            readonly pattern: string;
        };
        readonly zip: {
            readonly type: "string";
            readonly description: "zip code";
            readonly pattern: string;
        };
        readonly country: {
            readonly type: "string";
            readonly description: "2 letter country code";
            readonly pattern: string;
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const AddressInfoSchemaObject: SchemaObject;

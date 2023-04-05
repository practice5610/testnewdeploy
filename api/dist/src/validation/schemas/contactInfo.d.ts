import { SchemaObject } from '@loopback/openapi-v3';
export declare const ContactInfoSchema: {
    readonly type: "object";
    readonly description: "ContactInfo";
    readonly properties: {
        readonly phoneNumber: {
            readonly type: "string";
            readonly minLength: 10;
        };
        readonly emails: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly pattern: string;
            };
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const ContactInfoSchemaObject: SchemaObject;

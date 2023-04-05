import { SchemaObject } from 'openapi3-ts';
export declare const ExtraCostSchema: {
    readonly type: "object";
    readonly description: "Extra return fees the Merchant may charge to the Customer";
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly description: "Name of return fee";
            readonly minLength: 2;
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Explanation of return fee";
            readonly minLength: 2;
        };
        readonly price: SchemaObject;
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const ExtraCostSchemaObject: SchemaObject;

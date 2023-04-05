import { SchemaObject } from '@loopback/openapi-v3';
export declare const MoneySchema: {
    readonly type: "object";
    readonly description: "Money";
    readonly properties: {
        readonly amount: {
            readonly type: "integer";
        };
        readonly precision: {
            readonly type: "integer";
        };
        readonly currency: {
            readonly type: "string";
        };
        readonly symbol: {
            readonly type: "string";
        };
    };
    readonly required: readonly ["amount", "precision", "currency"];
    readonly additionalProperties: false;
};
export declare const MoneySchemaObject: SchemaObject;

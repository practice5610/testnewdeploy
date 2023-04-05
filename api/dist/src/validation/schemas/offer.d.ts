import { SchemaObject } from '@loopback/openapi-v3';
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const OfferSchema: {
    readonly type: "object";
    readonly description: "Offer";
    readonly properties: {
        readonly cashBackPerVisit: SchemaObject;
        readonly conditions: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly description: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly maxQuantity: {
            readonly type: "integer";
        };
        readonly maxVisits: {
            readonly type: "integer";
        };
        readonly merchantUID: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly startDate: {
            readonly type: "integer";
        };
        readonly title: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly product: SchemaObject;
        readonly expiration: {
            readonly type: "integer";
        };
        readonly _id: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly createdAt: {
            readonly type: "integer";
        };
        readonly updatedAt: {
            readonly type: "integer";
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const OfferSchemaObject: SchemaObject;

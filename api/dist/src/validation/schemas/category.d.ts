import { SchemaObject } from '@loopback/openapi-v3';
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const CategorySchema: {
    readonly type: "object";
    readonly description: "Category";
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly commissionRate: {
            readonly type: "integer";
        };
        readonly subCategories: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
                readonly minLength: 2;
            };
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
export declare const CategorySchemaObject: SchemaObject;

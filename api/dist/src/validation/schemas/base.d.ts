import { SchemaObject } from '@loopback/openapi-v3';
export declare const BaseSchema: {
    readonly type: "object";
    readonly description: "Base";
    readonly properties: {
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
export declare const BaseSchemaObject: SchemaObject;

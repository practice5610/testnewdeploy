import { AdminConfigType } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const ConfigSchema: {
    readonly type: "object";
    readonly description: "Config";
    readonly properties: {
        readonly type: {
            readonly enum: readonly [AdminConfigType.DEFAULT_PROCESSING_RATE, AdminConfigType.INVENTORY_TYPES];
        };
        readonly label: {
            readonly type: "string";
        };
        readonly value: {
            readonly type: "object";
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
export declare const ConfigSchemaObject: SchemaObject;

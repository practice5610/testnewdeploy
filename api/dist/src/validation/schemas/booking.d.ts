import { BookingStatus, BookingTypes } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const BookingSchema: {
    readonly type: "object";
    readonly description: "Booking";
    readonly properties: {
        readonly type: {
            readonly enum: readonly [BookingTypes.OFFER, BookingTypes.PRODUCT];
        };
        readonly item: {
            readonly type: "object";
            readonly oneOf: readonly [SchemaObject, SchemaObject];
        };
        readonly quantity: {
            readonly type: "integer";
        };
        readonly status: {
            readonly enum: readonly [BookingStatus.ACTIVE, BookingStatus.CANCELLED, BookingStatus.USED];
        };
        readonly memberUID: {
            readonly type: "string";
            readonly description: "Merchant's id";
        };
        readonly visits: {
            readonly type: "integer";
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const BookingSchemaObject: SchemaObject;

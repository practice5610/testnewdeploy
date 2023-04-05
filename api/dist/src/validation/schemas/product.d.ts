import { ProductStatus } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const ProductSchema: {
    readonly type: "object";
    readonly description: "Product";
    readonly properties: {
        readonly imageUrl: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly category: SchemaObject;
        readonly name: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly description: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly store: {
            readonly required: readonly ["_id", "name", "street1", "city", "state", "zip", "country", "companyName", "_geoloc", "merchant"];
            readonly nullable?: boolean | undefined;
            readonly discriminator?: import("@loopback/openapi-v3").DiscriminatorObject | undefined;
            readonly readOnly?: boolean | undefined;
            readonly writeOnly?: boolean | undefined;
            readonly xml?: import("@loopback/openapi-v3").XmlObject | undefined;
            readonly externalDocs?: import("@loopback/openapi-v3").ExternalDocumentationObject | undefined;
            readonly example?: any;
            readonly examples?: any[] | undefined;
            readonly deprecated?: boolean | undefined;
            readonly type?: "string" | "number" | "boolean" | "object" | "array" | "integer" | "null" | undefined;
            readonly format?: string | undefined;
            readonly allOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
            readonly oneOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
            readonly anyOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
            readonly not?: SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
            readonly items?: SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
            readonly properties?: {
                [propertyName: string]: SchemaObject | import("@loopback/openapi-v3").ReferenceObject;
            } | undefined;
            readonly additionalProperties?: boolean | SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
            readonly description?: string | undefined;
            readonly default?: any;
            readonly title?: string | undefined;
            readonly multipleOf?: number | undefined;
            readonly maximum?: number | undefined;
            readonly exclusiveMaximum?: boolean | undefined;
            readonly minimum?: number | undefined;
            readonly exclusiveMinimum?: boolean | undefined;
            readonly maxLength?: number | undefined;
            readonly minLength?: number | undefined;
            readonly pattern?: string | undefined;
            readonly maxItems?: number | undefined;
            readonly minItems?: number | undefined;
            readonly uniqueItems?: boolean | undefined;
            readonly maxProperties?: number | undefined;
            readonly minProperties?: number | undefined;
            readonly enum?: any[] | undefined;
        };
        readonly price: SchemaObject;
        readonly attributes: {
            readonly type: "object";
        };
        readonly _tags: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly merchantUID: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly packageDetails: {
            readonly type: "object";
        };
        readonly shippingPolicy: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly status: {
            readonly enum: readonly [ProductStatus.APPROVED, ProductStatus.DECLINED, ProductStatus.PENDING];
        };
        readonly quantity: {
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
export declare const ProductSchemaObject: SchemaObject;

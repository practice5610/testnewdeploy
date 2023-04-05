import { StoreTypes } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
export declare const StoreBasicSchema: {
    readonly type: "object";
    readonly description: "Store Basic";
    readonly properties: {
        readonly companyName: {
            readonly type: "string";
            readonly minLength: 2;
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const StoreBasicSchemaObject: SchemaObject;
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
export declare const StoreSchema: {
    readonly type: "object";
    readonly description: "Store";
    readonly properties: {
        readonly pin: {
            readonly type: "integer";
        };
        readonly companyLogoUrl: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly coverImageUrl: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly companyType: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly companyDescription: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly fein: {
            readonly type: "integer";
        };
        readonly years: {
            readonly type: "integer";
        };
        readonly storeType: {
            readonly enum: readonly [StoreTypes.BRICK_AND_MORTAR, StoreTypes.ONLINE, StoreTypes.BOTH];
        };
        readonly links: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly _tags: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly _geoloc: SchemaObject;
        readonly openingTime: {
            readonly type: "integer";
        };
        readonly closingTime: {
            readonly type: "integer";
        };
        readonly days: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly merchant: {
            readonly required: readonly ["uid", "firstName", "lastName"];
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
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const StoreSchemaObject: SchemaObject;

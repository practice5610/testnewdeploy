import { ReturnMethod, TransactionTotalParts } from '@boom-platform/globals/lib/enums/returns';
import { SchemaObject } from 'openapi3-ts';
export declare const PolicySchema: {
    readonly type: "object";
    readonly description: "Merchant's Return Policy";
    readonly properties: {
        readonly merchantID: {
            readonly type: "string";
            readonly description: "BoomUser's id";
        };
        readonly name: {
            readonly type: "string";
            readonly description: "Name of Return Policy";
            readonly minLength: 2;
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Description of the Return Policy";
            readonly minLength: 2;
        };
        readonly refundsAccepted: {
            readonly type: "boolean";
            readonly description: "Merchant accepts refund request";
        };
        readonly autoApprove: {
            readonly type: "boolean";
            readonly description: "Merchant accepts all return requests with this policy";
        };
        readonly costsImposed: {
            readonly type: "array";
            readonly description: "All extra costs the customer may incurr for return";
            readonly items: {
                readonly required: readonly ["name", "description", "price"];
                readonly nullable?: boolean | undefined;
                readonly discriminator?: import("openapi3-ts").DiscriminatorObject | undefined;
                readonly readOnly?: boolean | undefined;
                readonly writeOnly?: boolean | undefined;
                readonly xml?: import("openapi3-ts").XmlObject | undefined;
                readonly externalDocs?: import("openapi3-ts").ExternalDocumentationObject | undefined;
                readonly example?: any;
                readonly examples?: any[] | undefined;
                readonly deprecated?: boolean | undefined;
                readonly type?: "string" | "number" | "boolean" | "object" | "array" | "integer" | "null" | undefined;
                readonly format?: string | undefined;
                readonly allOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly oneOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly anyOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly not?: SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                readonly items?: SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                readonly properties?: {
                    [propertyName: string]: SchemaObject | import("openapi3-ts").ReferenceObject;
                } | undefined;
                readonly additionalProperties?: boolean | SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
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
        readonly daysToReturn: {
            readonly type: "integer";
            readonly description: "How many days an item is eligible for return";
        };
        readonly returnMethod: {
            readonly description: "Methods a customer can take to retun an item";
            readonly items: {
                readonly enum: readonly [ReturnMethod.DROP_OFF, ReturnMethod.NO_RETURN, ReturnMethod.SHIP];
            };
        };
        readonly dropOffAddress: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly transactionTotalPartsToRefund: {
            readonly type: "array";
            readonly description: "Parts of the transaction to be refunded to the customer";
            readonly items: {
                readonly enum: readonly [TransactionTotalParts.BOOM_FEE, TransactionTotalParts.NET_PRODUCT_COST, TransactionTotalParts.SHIPPING, TransactionTotalParts.TAX];
            };
        };
        readonly returnCosts: {
            readonly type: "array";
            readonly description: "Costs customer incurrs for return";
            readonly items: {
                readonly required: readonly ["name", "description", "price", "type"];
                readonly nullable?: boolean | undefined;
                readonly discriminator?: import("openapi3-ts").DiscriminatorObject | undefined;
                readonly readOnly?: boolean | undefined;
                readonly writeOnly?: boolean | undefined;
                readonly xml?: import("openapi3-ts").XmlObject | undefined;
                readonly externalDocs?: import("openapi3-ts").ExternalDocumentationObject | undefined;
                readonly example?: any;
                readonly examples?: any[] | undefined;
                readonly deprecated?: boolean | undefined;
                readonly type?: "string" | "number" | "boolean" | "object" | "array" | "integer" | "null" | undefined;
                readonly format?: string | undefined;
                readonly allOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly oneOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly anyOf?: (SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                readonly not?: SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                readonly items?: SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                readonly properties?: {
                    [propertyName: string]: SchemaObject | import("openapi3-ts").ReferenceObject;
                } | undefined;
                readonly additionalProperties?: boolean | SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
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
export declare const PolicySchemaObject: SchemaObject;

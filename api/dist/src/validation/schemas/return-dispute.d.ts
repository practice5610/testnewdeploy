import { SchemaObject } from 'openapi3-ts';
export declare const DisputeSchema: {
    readonly type: "object";
    readonly description: "Dispute regarding return";
    readonly properties: {
        readonly returnRequest: {
            readonly required: readonly ["_id", "createdAt", "updatedAt", "customerID", "merchantID", "returnStatus", "merchantPolicyID", "returnReason", "returnMethod", "purchaseTransactionID", "returnTransactionID"];
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
        readonly isOpen: {
            readonly type: "boolean";
            readonly description: "Lets the merchant, customer, or admin know if a dispute is still open";
        };
        readonly comment: {
            readonly type: "string";
            readonly description: "Comments regarding a dispute";
            readonly minLength: 2;
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
export declare const DisputeSchemaObject: SchemaObject;

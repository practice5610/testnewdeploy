import { Gender, RoleKey } from '@boom-platform/globals';
import { SchemaObject } from '@loopback/openapi-v3';
export declare const ProfileSchema: {
    readonly type: "object";
    readonly description: "BoomUser's Profile";
    readonly properties: {
        readonly uid: {
            readonly type: "string";
            readonly description: "BoomUser's id";
        };
        readonly firstName: {
            readonly type: "string";
            readonly description: "BoomUser's First Name";
            readonly minLength: 2;
        };
        readonly lastName: {
            readonly type: "string";
            readonly description: "BoomUser's Last Name";
            readonly minLength: 2;
        };
        readonly contact: SchemaObject;
        readonly addresses: {
            readonly type: "array";
            readonly description: "All Addresses that belong to this BoomUser";
            readonly items: {
                readonly required: readonly ["name", "street1", "city", "state", "zip"];
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
        readonly createdAt: {
            readonly type: "integer";
            readonly description: "Unix time when this BoomUser's profile was created";
        };
        readonly updatedAt: {
            readonly type: "integer";
            readonly description: "Last unix time when this BoomUser's profile was modified";
        };
        readonly gender: {
            readonly description: "BoomUser's gender";
            readonly enum: readonly [Gender.MALE, Gender.FEMALE, Gender.NONE];
        };
        readonly registrationStep: {
            readonly type: "integer";
            readonly description: "BoomUser's registration step";
        };
        readonly finishedRegistration: {
            readonly type: "boolean";
            readonly description: "BoomUser is registered ";
        };
        readonly roles: {
            readonly type: "array";
            readonly description: "BoomUser's roles";
            readonly items: {
                readonly enum: readonly [RoleKey.Admin, RoleKey.All, RoleKey.Member, RoleKey.Merchant, RoleKey.SuperAdmin];
            };
        };
        readonly cards: {
            readonly type: "array";
            readonly description: "BoomUser's cards";
            readonly items: {
                readonly type: "string";
            };
            readonly nullable: true;
        };
        readonly hasCards: {
            readonly type: "boolean";
        };
        readonly store: {
            readonly type: "object";
            readonly description: "BoomUser's store";
        };
        readonly profileImg: SchemaObject;
        readonly enableNotification: {
            readonly type: "boolean";
            readonly description: "BoomUser allows notifications";
        };
        readonly notificationSound: {
            readonly type: "boolean";
            readonly description: "BoomUser allows notifications sound";
        };
        readonly notificationVibration: {
            readonly type: "boolean";
            readonly description: "BoomUser allows notifications vibrations";
        };
        readonly fcmToken: {
            readonly type: "string";
        };
        readonly range: {
            readonly type: "integer";
        };
        readonly grossEarningsPendingWithdrawal: SchemaObject;
        readonly netEarningsPendingWithdrawal: SchemaObject;
        readonly tempPassword: {
            readonly type: "string";
        };
        readonly password: {
            readonly type: "string";
        };
        readonly plaidInfo: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
            };
        };
        readonly taxableNexus: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
            };
        };
        readonly boomAccounts: {
            readonly type: "array";
            readonly items: {
                readonly type: "string";
            };
        };
        readonly forceUpdate: {
            readonly type: "boolean";
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: true;
};
export declare const ProfileSchemaObject: SchemaObject;

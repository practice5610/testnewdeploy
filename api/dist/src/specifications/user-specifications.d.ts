import { CommonSummary, RequestBodyDescriptions, ServiceResponseCodes, SpecificationDescriptions, SpecificationSummaries } from '../constants';
export declare const GETAdminUsersSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            success: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                            data: {
                                type: string;
                                items: {
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
                                        readonly contact: import("openapi3-ts").SchemaObject;
                                        readonly addresses: {
                                            readonly type: "array";
                                            readonly description: "All Addresses that belong to this BoomUser";
                                            readonly items: {
                                                readonly required: readonly ["name", "street1", "city", "state", "zip"];
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
                                                readonly allOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                                readonly oneOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                                readonly anyOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                                readonly not?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                                readonly items?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                                readonly properties?: {
                                                    [propertyName: string]: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject;
                                                } | undefined;
                                                readonly additionalProperties?: boolean | import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
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
                                            readonly enum: readonly [import("@boom-platform/globals").Gender.MALE, import("@boom-platform/globals").Gender.FEMALE, import("@boom-platform/globals").Gender.NONE];
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
                                                readonly enum: readonly [import("@boom-platform/globals").RoleKey.Admin, import("@boom-platform/globals").RoleKey.All, import("@boom-platform/globals").RoleKey.Member, import("@boom-platform/globals").RoleKey.Merchant, import("@boom-platform/globals").RoleKey.SuperAdmin];
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
                                        readonly profileImg: import("openapi3-ts").SchemaObject;
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
                                        readonly grossEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
                                        readonly netEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
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
                            };
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: import("@boom-platform/globals").AllOptionalExceptFor<import("@boom-platform/globals").BoomUser, "roles" | "uid" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "contact" | "addresses">[];
                            };
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        badRequest: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        internalServerError: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETAdminUserSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            success: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                            data: {
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
                                    readonly contact: import("openapi3-ts").SchemaObject;
                                    readonly addresses: {
                                        readonly type: "array";
                                        readonly description: "All Addresses that belong to this BoomUser";
                                        readonly items: {
                                            readonly required: readonly ["name", "street1", "city", "state", "zip"];
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
                                            readonly allOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly oneOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly anyOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly not?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                            readonly items?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                            readonly properties?: {
                                                [propertyName: string]: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject;
                                            } | undefined;
                                            readonly additionalProperties?: boolean | import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
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
                                        readonly enum: readonly [import("@boom-platform/globals").Gender.MALE, import("@boom-platform/globals").Gender.FEMALE, import("@boom-platform/globals").Gender.NONE];
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
                                            readonly enum: readonly [import("@boom-platform/globals").RoleKey.Admin, import("@boom-platform/globals").RoleKey.All, import("@boom-platform/globals").RoleKey.Member, import("@boom-platform/globals").RoleKey.Merchant, import("@boom-platform/globals").RoleKey.SuperAdmin];
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
                                    readonly profileImg: import("openapi3-ts").SchemaObject;
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
                                    readonly grossEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
                                    readonly netEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
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
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: import("@boom-platform/globals").AllOptionalExceptFor<import("@boom-platform/globals").BoomUser, "roles" | "uid" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "contact" | "addresses">;
                            };
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        badRequest: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        internalServerError: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        404: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        notFound: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        409: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        conflict: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTUsersVerifyPhoneNumberSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            success: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                            data: {
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
                                    readonly contact: import("openapi3-ts").SchemaObject;
                                    readonly addresses: {
                                        readonly type: "array";
                                        readonly description: "All Addresses that belong to this BoomUser";
                                        readonly items: {
                                            readonly required: readonly ["name", "street1", "city", "state", "zip"];
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
                                            readonly allOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly oneOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly anyOf?: (import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject)[] | undefined;
                                            readonly not?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                            readonly items?: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
                                            readonly properties?: {
                                                [propertyName: string]: import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject;
                                            } | undefined;
                                            readonly additionalProperties?: boolean | import("openapi3-ts").SchemaObject | import("openapi3-ts").ReferenceObject | undefined;
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
                                        readonly enum: readonly [import("@boom-platform/globals").Gender.MALE, import("@boom-platform/globals").Gender.FEMALE, import("@boom-platform/globals").Gender.NONE];
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
                                            readonly enum: readonly [import("@boom-platform/globals").RoleKey.Admin, import("@boom-platform/globals").RoleKey.All, import("@boom-platform/globals").RoleKey.Member, import("@boom-platform/globals").RoleKey.Merchant, import("@boom-platform/globals").RoleKey.SuperAdmin];
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
                                    readonly profileImg: import("openapi3-ts").SchemaObject;
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
                                    readonly grossEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
                                    readonly netEarningsPendingWithdrawal: import("openapi3-ts").SchemaObject;
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
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: string;
                                data: {
                                    foundAccount: boolean;
                                };
                            };
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        badRequest: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        internalServerError: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        404: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        notFound: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        409: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        conflict: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTUsersVerifyPhoneNumberRequestBody: {
    description: RequestBodyDescriptions;
    required: boolean;
    content: {
        'application/json': {
            schema: import("openapi3-ts").SchemaObject;
            examples: {
                success: {
                    summary: string;
                    value: {
                        firstName: string;
                        lastName: string;
                        phone: string;
                    };
                };
            };
        };
    };
};
export declare const GETTransferReceiverProfileSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            success: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                            data: {
                                type: string;
                                properties: {
                                    firstName: {
                                        readonly type: "string";
                                        readonly description: "BoomUser's First Name";
                                        readonly minLength: 2;
                                    };
                                    lastName: {
                                        readonly type: "string";
                                        readonly description: "BoomUser's Last Name";
                                        readonly minLength: 2;
                                    };
                                    profileImg: import("openapi3-ts").SchemaObject;
                                };
                                additionalProperties: boolean;
                            };
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary[];
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: import("@boom-platform/globals").BoomUser;
                            };
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        badRequest: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        internalServerError: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        401: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        unauthorized: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        404: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        notFound: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTAdminUserSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            success: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                            data: {
                                type: string;
                                description: string;
                            };
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: string;
                                data: {
                                    uid: string;
                                    email: string | undefined;
                                    emailVerified: boolean;
                                    disabled: boolean;
                                    metadata: {
                                        lastSignInTime: null;
                                        creationTime: string;
                                    };
                                    tokensValidAfterTime: string;
                                    providerData: {
                                        uid: string | undefined;
                                        email: string | undefined;
                                        providerId: string;
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        400: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        badRequest: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        500: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        internalServerError: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        404: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        notFound: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTAdminUserRequestBody: {
    description: RequestBodyDescriptions;
    required: boolean;
    content: {
        'application/json': {
            schema: import("openapi3-ts").SchemaObject;
            examples: {
                success: {
                    summary: string;
                    value: {
                        email: string;
                        password: string | undefined;
                        roles: import("@boom-platform/globals").RoleKey[];
                    };
                };
            };
        };
    };
};

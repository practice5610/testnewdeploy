import { SchemaObject } from '@loopback/openapi-v3';
import { CommonSummary } from '../constants';
import { ShippingBox, ShippingOrder, ShippingPolicy } from '../models';
export declare const POSTAddressValidationRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                required: string[];
                nullable?: boolean | undefined;
                discriminator?: import("@loopback/openapi-v3").DiscriminatorObject | undefined;
                readOnly?: boolean | undefined;
                writeOnly?: boolean | undefined;
                xml?: import("@loopback/openapi-v3").XmlObject | undefined;
                externalDocs?: import("@loopback/openapi-v3").ExternalDocumentationObject | undefined;
                example?: any;
                examples?: any[] | undefined;
                deprecated?: boolean | undefined;
                type?: "string" | "number" | "boolean" | "object" | "array" | "integer" | "null" | undefined;
                format?: string | undefined;
                allOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
                oneOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
                anyOf?: (SchemaObject | import("@loopback/openapi-v3").ReferenceObject)[] | undefined;
                not?: SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
                items?: SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
                properties?: {
                    [propertyName: string]: SchemaObject | import("@loopback/openapi-v3").ReferenceObject;
                } | undefined;
                additionalProperties?: boolean | SchemaObject | import("@loopback/openapi-v3").ReferenceObject | undefined;
                description?: string | undefined;
                default?: any;
                title?: string | undefined;
                multipleOf?: number | undefined;
                maximum?: number | undefined;
                exclusiveMaximum?: boolean | undefined;
                minimum?: number | undefined;
                exclusiveMinimum?: boolean | undefined;
                maxLength?: number | undefined;
                minLength?: number | undefined;
                pattern?: string | undefined;
                maxItems?: number | undefined;
                minItems?: number | undefined;
                uniqueItems?: boolean | undefined;
                maxProperties?: number | undefined;
                minProperties?: number | undefined;
                enum?: any[] | undefined;
            };
            examples: {
                formatOne: {
                    summary: string;
                    value: {
                        name: string;
                        number: string;
                        street1: string;
                        city: string;
                        state: string;
                        zip: string;
                        country: string;
                    };
                };
                formatTwo: {
                    summary: string;
                    value: {
                        name: string;
                        street1: string;
                        street2: string;
                        city: string;
                        state: string;
                        zip: string;
                        country: string;
                    };
                };
            };
        };
    };
};
export declare const POSTAddressValidationSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        successWithSuggestion: {
                            summary: string;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    address: {
                                        object_id: string;
                                        name: string;
                                        number: string;
                                        street1: string;
                                        street2: string;
                                        city: string;
                                        state: string;
                                        zip: string;
                                        country: string;
                                        is_complete: boolean;
                                    };
                                    is_valid: boolean;
                                    messages: {
                                        source: string;
                                        code: string;
                                        type: string;
                                        text: string;
                                    }[];
                                };
                            };
                        };
                        successWithNoSuggestion: {
                            summary: string;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    address: {
                                        object_id: string;
                                        name: string;
                                        number: string;
                                        street1: string;
                                        street2: string;
                                        city: string;
                                        state: string;
                                        zip: string;
                                        country: string;
                                        is_complete: boolean;
                                    };
                                    is_valid: boolean;
                                    messages: null;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTGetRatesRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        shipToAddressId: string;
                        shipFromAddressId: string;
                        parcels: {
                            length: number;
                            width: number;
                            height: number;
                            distance_unit: string;
                            weight: number;
                            mass_unit: string;
                        }[];
                        shipmentMethods: string[];
                    };
                };
            };
        };
    };
};
export declare const POSTGetRatesSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: string;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    shippo_id: string;
                                    attributes: string[];
                                    amount: {
                                        amount: number;
                                        precision: number;
                                        currency: string;
                                        symbol: string;
                                    };
                                    provider: string;
                                    service: string;
                                    service_token: string;
                                    estimated_days: number;
                                    duration_terms: string;
                                }[];
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTPurchaseRateRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        shippoRateId: string;
                        purchaserId: string;
                    };
                };
            };
        };
    };
};
export declare const POSTPurchaseRateSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETShippoTransactionSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    status: string;
                                    createdAt: number;
                                    updatedAt: number;
                                    shippo_id: string;
                                    rate: string;
                                    label_url: string;
                                    eta: null;
                                    tracking_number: string;
                                    tracking_status: string;
                                    tracking_url_provider: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETShippingLabelsSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: string[];
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTRefundShippingRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': StringConstructor;
            };
            examples: {
                success: {
                    summary: string;
                    value: string;
                };
            };
        };
    };
};
export declare const POSTRefundShippingSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTEstimateShippingRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        parcel: {
                            length: number;
                            width: number;
                            height: number;
                            distance_unit: string;
                            weight: number;
                            mass_unit: string;
                        };
                        shipmentMethod: string;
                        to: string;
                        from: string;
                    };
                };
            };
        };
    };
};
export declare const POSTEstimateShippingSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    amount: number;
                                    precision: number;
                                    currency: string;
                                    symbol: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETShippingOrderSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof ShippingOrder;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                _id: string;
                                createdAt: number;
                                updatedAt: number;
                                shippo_id: string;
                                trackingNumber: string;
                                trackingLink: null;
                                price: {
                                    amount: number;
                                    precision: number;
                                    currency: string;
                                    symbol: string;
                                };
                                purchaser: string;
                                status: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTShippingPolicyRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': typeof ShippingPolicy;
            };
            examples: {
                success: {
                    summary: string;
                    value: {
                        name: string;
                        merchantId: string;
                        freeShippingThresholds: never[];
                    };
                };
            };
        };
    };
};
export declare const POSTShippingBoxRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': typeof ShippingBox;
            };
            examples: {
                success: {
                    summary: CommonSummary;
                    value: {
                        name: string;
                        unit: string;
                        length: number;
                        width: number;
                        height: number;
                    };
                };
            };
        };
    };
};
export declare const GETShippingBoxSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof ShippingBox;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTShippingPolicySpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof ShippingPolicy;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                _id: string;
                                createdAt: number;
                                updatedAt: number;
                                name: string;
                                merchantId: string;
                                freeShippingThresholds: never[];
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTShippingBoxSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof ShippingBox;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: string;
                                data: {
                                    _id: string;
                                    createdAt: number;
                                    updatedAt: number;
                                    name: string;
                                    merchantId: string;
                                    unit: string;
                                    length: number;
                                    width: number;
                                    height: number;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETShippingPolicySpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof ShippingPolicy;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                _id: string;
                                createdAt: number;
                                updatedAt: number;
                                name: string;
                                merchantId: string;
                                freeShippingThresholds: never[];
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const POSTShippingCheckoutRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
            examples: {
                success: {
                    summary: string;
                    value: {
                        bookings: {
                            _id: string;
                            createdAt: number;
                            updatedAt: number;
                            type: string;
                            item: {
                                _id: string;
                                createdAt: number;
                                updatedAt: number;
                                imageUrl: string;
                                merchantUID: string;
                                category: {
                                    name: string;
                                    subCategories: string[];
                                };
                                name: string;
                                description: string;
                                store: {
                                    _id: string;
                                    companyName: string;
                                    address: string;
                                    _geoloc: {
                                        lng: number;
                                        lat: number;
                                    };
                                    merchant: {
                                        uid: string;
                                        firstName: string;
                                        lastName: string;
                                    };
                                };
                                price: {
                                    amount: number;
                                    precision: number;
                                    currency: string;
                                    symbol: string;
                                };
                                attributes: {};
                                _tags: never[];
                                objectID: string;
                                packageDetails: {
                                    weight: number;
                                    massUnit: string;
                                    boxId: string;
                                    itemsPerBox: number;
                                    shipsFrom: string;
                                };
                                shippingPolicy: string;
                                status: string;
                            };
                            quantity: number;
                            status: string;
                            memberUID: string;
                            visits: number;
                        }[];
                        shipToAddressId: string;
                    };
                };
            };
        };
    };
};
export declare const POSTShippingCheckoutSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    orderGroups: {
                                        store: string;
                                        rates: {
                                            shippo_id: string;
                                            attributes: string[];
                                            amount: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            provider: string;
                                            service: string;
                                            service_token: string;
                                            estimated_days: number;
                                            duration_terms: string;
                                        }[];
                                        bookings: {
                                            _id: string;
                                            createdAt: number;
                                            updatedAt: number;
                                            type: string;
                                            item: {
                                                _id: string;
                                                createdAt: number;
                                                updatedAt: number;
                                                imageUrl: string;
                                                merchantUID: string;
                                                category: {
                                                    name: string;
                                                    subCategories: string[];
                                                };
                                                name: string;
                                                description: string;
                                                store: {
                                                    _id: string;
                                                    companyName: string;
                                                    address: string;
                                                    _geoloc: {
                                                        lng: number;
                                                        lat: number;
                                                    };
                                                    merchant: {
                                                        uid: string;
                                                        firstName: string;
                                                        lastName: string;
                                                    };
                                                };
                                                price: {
                                                    amount: number;
                                                    precision: number;
                                                    currency: string;
                                                    symbol: string;
                                                };
                                                attributes: {};
                                                _tags: never[];
                                                objectID: string;
                                                packageDetails: {
                                                    weight: number;
                                                    massUnit: string;
                                                    boxId: string;
                                                    itemsPerBox: number;
                                                    shipsFrom: string;
                                                };
                                                shippingPolicy: string;
                                                status: string;
                                            };
                                            quantity: number;
                                            status: string;
                                            memberUID: string;
                                            visits: number;
                                        }[];
                                        shippable: boolean;
                                    }[];
                                    failedBookings: never[];
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

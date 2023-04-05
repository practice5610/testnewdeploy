import { CommonSummary, ServiceResponseCodes } from '../constants';
import { Booking } from '../models';
export declare const POSTBookingsSpecification: {
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
                                    valids: {
                                        _id: string;
                                        createdAt: number;
                                        updatedAt: number;
                                        type: string;
                                        item: {
                                            _id: string;
                                            createdAt: number;
                                            updatedAt: number;
                                            cashBackPerVisit: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            conditions: string[];
                                            description: string;
                                            maxQuantity: number;
                                            maxVisits: number;
                                            startDate: number;
                                            title: string;
                                            product: {
                                                _id: string;
                                                createdAt: number;
                                                updatedAt: number;
                                                imageUrl: string;
                                                merchantUID: string;
                                                category: {
                                                    _id: string;
                                                    createdAt: number;
                                                    updatedAt: number;
                                                    name: string;
                                                    commissionRate: number;
                                                    subCategories: string[];
                                                };
                                                name: string;
                                                description: string;
                                                store: {
                                                    _id: string;
                                                    companyName: string;
                                                    address: string;
                                                    _geoloc: {
                                                        lat: number;
                                                        lng: number;
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
                                                attributes: {
                                                    sku: string;
                                                    color: string;
                                                    'shipping weight': string;
                                                };
                                                _tags: string[];
                                                status: string;
                                                quantity: number;
                                            };
                                            expiration: number;
                                        };
                                        quantity: number;
                                        status: string;
                                        memberUID: string;
                                        visits: number;
                                    }[];
                                    invalids: never[];
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
    };
};
export declare const GETBookingsCountSpecification: {
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
                                    count: number;
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
    };
};
export declare const GETBookingsSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        items: {
                            'x-ts-type': typeof Booking;
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                _id: string;
                                createdAt: number;
                                updatedAt: number;
                                type: string;
                                item: {
                                    _id: string;
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
                                        merchant: {
                                            uid: string;
                                            name: string;
                                            firstName: string;
                                            lastName: string;
                                        };
                                        country: string;
                                        state: string;
                                        city: string;
                                        zip: string;
                                        number: string;
                                        street1: string;
                                        street2: string;
                                        _geoloc: {
                                            lat: number;
                                            lng: number;
                                        };
                                    };
                                    price: {
                                        amount: number;
                                        precision: number;
                                        currency: string;
                                        symbol: string;
                                    };
                                    attributes: {
                                        upc: number;
                                        product_id: number;
                                        item_id: number;
                                        stock: string;
                                        supplier_id: number;
                                        supplier_name: string;
                                        brand_name: string;
                                        item_sku: string;
                                        ship_weight: number;
                                        warranty: string;
                                    };
                                    _tags: never[];
                                };
                                quantity: number;
                                status: string;
                                memberUID: string;
                                visits: number;
                            }[];
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
    };
};
export declare const PATCHBookingsFilteredSpecification: {
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
                                    count: number;
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
    };
};
export declare const PATCHBookingsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaRef;
        };
    };
};
export declare const GETBookingByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Booking;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    _id: string;
                                    createdAt: number;
                                    updatedAt: number;
                                    type: string;
                                    item: {
                                        _id: string;
                                        _tags: never[];
                                        imageUrl: string;
                                        merchantUID: string;
                                        name: string;
                                        description: string;
                                        price: {
                                            amount: number;
                                            precision: number;
                                            currency: string;
                                            symbol: string;
                                        };
                                        category: {
                                            _id: string;
                                            createdAt: number;
                                            updatedAt: number;
                                            name: string;
                                            subCategories: string[];
                                        };
                                        packageDetails: {
                                            weight: number;
                                            massUnit: string;
                                            boxId: string;
                                            itemsPerBox: number;
                                            shipsFrom: string;
                                        };
                                        shippingPolicy: string;
                                        status: string;
                                        store: {
                                            _id: string;
                                            companyName: string;
                                            merchant: {
                                                uid: string;
                                                name: string;
                                                firstName: string;
                                                lastName: string;
                                            };
                                            country: string;
                                            state: string;
                                            city: string;
                                            zip: string;
                                            number: string;
                                            street1: string;
                                            street2: string;
                                            _geoloc: {
                                                lat: number;
                                                lng: number;
                                            };
                                        };
                                    };
                                    quantity: number;
                                    status: string;
                                    memberUID: string;
                                    visits: number;
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
                    examples: {
                        notFound: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: number;
                                    name: string;
                                    message: {
                                        code: string;
                                        entityName: string;
                                        entityId: string;
                                    };
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
    };
};
export declare const PATCHBookingByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        204: {
            description: string;
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
    };
};
export declare const PATCHBookingByIDRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaRef;
        };
    };
};
export declare const DELBookingByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        204: {
            description: string;
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
    };
};

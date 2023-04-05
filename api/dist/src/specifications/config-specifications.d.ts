import { SchemaObject } from '@loopback/openapi-v3';
import { CommonSummary, RequestBodyDescriptions, ServiceResponseCodes, SpecificationDescriptions, SpecificationSummaries } from '../constants';
export declare const POSTConfigSpecification: {
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
                            data: SchemaObject;
                        };
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
                                    label: string;
                                    value: {
                                        key1: string;
                                        key2: string;
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
export declare const POSTConfigRequestBody: {
    description: RequestBodyDescriptions;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
            examples: {
                success: {
                    summary: CommonSummary;
                    value: {
                        type: string;
                        label: string;
                        value: {
                            key1: string;
                            key2: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const GETConfigSpecification: {
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
                                items: SchemaObject;
                            };
                        };
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
                                    label: string;
                                    value: {
                                        b7Y8uNIbpInpei3vfV0QJ: {
                                            purchasePrice: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            label: string;
                                            name: string;
                                        };
                                        'tAQv5T-L3qjEgEAQQjSIV': {
                                            purchasePrice: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            label: string;
                                            name: string;
                                        };
                                        oPAmLRahdC7203Z1fKCBo: {
                                            purchasePrice: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            label: string;
                                        };
                                        "DNR_iN0--1uSi_krur5IO": {
                                            purchasePrice: {
                                                amount: number;
                                                precision: number;
                                                currency: string;
                                                symbol: string;
                                            };
                                            label: string;
                                        };
                                    };
                                }[];
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
export declare const PATCHConfigSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
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
export declare const PATCHConfigRequestBody: {
    description: RequestBodyDescriptions;
    required: boolean;
    content: {
        'application/json': {
            schema: SchemaObject;
            examples: {
                success: {
                    summary: CommonSummary;
                    value: {
                        type: string;
                        label: string;
                        value: {
                            key1: string;
                            key2: string;
                        };
                    };
                };
            };
        };
    };
};
export declare const DELConfigIdSpecifications: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
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

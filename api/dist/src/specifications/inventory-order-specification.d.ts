import { CommonSummary, ResponseSuccessDescription, ServiceResponseCodes, SpecificationDescriptions, SpecificationSummaries } from '../constants';
import { InventoryOrder } from '../models';
export declare const GETInventoryOrderCountSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: "object";
                        title: string;
                        'x-typescript-type': string;
                        properties: {
                            count: {
                                type: "number";
                            };
                        };
                    };
                    success: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                count: number;
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
export declare const GETInventoryOrdersSpecification: {
    summary: SpecificationSummaries;
    description: SpecificationDescriptions;
    responses: {
        200: {
            description: ResponseSuccessDescription;
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
                                    'x-ts-type': typeof InventoryOrder;
                                };
                            };
                        };
                        examples: {
                            success: {
                                summary: CommonSummary;
                                value: {
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

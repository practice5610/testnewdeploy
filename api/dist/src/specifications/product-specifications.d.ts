import { CommonSummary, ServiceResponseCodes } from '../constants';
import { Product } from '../models';
export declare const POSTProductSourceDobaSpecification: {
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
                };
            };
        };
    };
};
export declare const POSTProductSourceDobaResumeSpecification: {
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
                };
            };
        };
    };
};
export declare const POSTProductsSpecification: {
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
                            'x-ts-type': typeof Product;
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                successful: {
                                    _id: string;
                                    objectID: string;
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
                                }[];
                                failed: never[];
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
export declare const POSTProductsRequestBody: {
    description: string;
    content: {
        'application/json': {
            schema: {
                type: string;
                items: {
                    'x-ts-type': typeof Product;
                };
                example: string[];
            };
        };
    };
};
export declare const GETProductsCountSpecification: {
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
export declare const GETProductsSpecification: {
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
                            'x-ts-type': typeof Product;
                        };
                    };
                };
            };
        };
    };
};
export declare const GETProductByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Product;
                    };
                };
            };
        };
    };
};
export declare const PATCHProductByIDSpecification: {
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
export declare const PATCHProductByIDRequestBody: {
    content: {
        'application/json': {
            schema: import("@loopback/rest").SchemaRef;
        };
    };
};
export declare const DELProductByIDSpecification: {
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

import { CommonSummary, ServiceResponseCodes } from '../constants';
export declare const POSTSmsAppSpecification: {
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
                    success: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: string;
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
export declare const POSTSmsAppRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        token: string;
                        phone: string;
                    };
                };
            };
        };
    };
};

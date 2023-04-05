import { CommonSummary, ServiceResponseCodes } from '../../../constants';
export interface GlobalResponseExamplesBuilderInterface {
    description?: string;
    message?: string;
}
export declare const GlobalResponseExamplesBuilder: {
    BAD_REQUEST: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    UNAUTHORIZED: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    FORBIDDEN: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    RECORD_NOT_FOUND: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    NOT_ACCEPTABLE: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
                    notAcceptable: {
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
    UNPROCESSABLE: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    RECORD_CONFLICT: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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
    INTERNAL_SERVER_ERROR: ({ description, message, }?: GlobalResponseExamplesBuilderInterface) => {
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

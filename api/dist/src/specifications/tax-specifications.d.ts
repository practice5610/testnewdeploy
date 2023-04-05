import { CommonSummary } from '../constants';
export declare const POSTGetTaxableProductSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            context: {
                'application/json': {
                    schema: {
                        type: string;
                        items: {
                            'x-ts-type': ObjectConstructor;
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    id: string;
                                    tax: {
                                        amount: number;
                                        precision: number;
                                        currency: string;
                                        symbol: string;
                                    };
                                }[];
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const PUTSetTaxableStatesSpecification: {
    summary: string;
    description: string;
    responses: {
        204: {
            description: string;
        };
    };
};
export declare const POSTGetTaxableProductRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        id: string;
                        toAddress: {
                            address: string;
                            city: string;
                            state: string;
                            country: string;
                        };
                    }[];
                };
            };
        };
    };
};
export declare const PUTSetTaxableStatesRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaObject | import("@loopback/openapi-v3").SchemaRef;
            examples: {
                success: {
                    summary: string;
                    value: {
                        country: string;
                        state: string;
                    }[];
                };
            };
        };
    };
};

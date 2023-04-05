import { CommonSummary, ServiceResponseCodes } from '../constants';
import { BoomAccount } from '../models';
export declare const GETBoomAccountByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string[];
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof BoomAccount;
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
                                    status: string;
                                    balance: {
                                        amount: number;
                                        currency: string;
                                        precision: number;
                                    };
                                    customerID: string;
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
export declare const GETBalanceByUIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string[];
            content: {
                'application/json': {
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    amount: number;
                                    currency: string;
                                    precision: number;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResponseExamplesBuilder = void 0;
const constants_1 = require("../../../constants");
const standardErrorResponseSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'integer' },
        name: { type: 'string' },
        message: { type: 'string' },
    },
};
exports.GlobalResponseExamplesBuilder = {
    BAD_REQUEST: ({ 
    // WARNING!! This is used by the Schema validators too - It can be used by our controllers
    description = 'Bad Request.', message = constants_1.APIResponseMessages.BAD_REQUEST, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: Object.assign(Object.assign({}, standardErrorResponseSchema), { properties: Object.assign(Object.assign({}, standardErrorResponseSchema.properties), { code: { type: 'string' } }) }),
                    examples: {
                        [constants_1.ExampleField.BAD_REQUEST]: {
                            summary: constants_1.CommonSummary.BAD_REQUEST,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                                    name: 'BadRequestError',
                                    message,
                                    code: 'MISSING_REQUIRED_PARAMETER',
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    UNAUTHORIZED: ({ description = 'Unauthorized to perform this action.', message = constants_1.APIResponseMessages.UNAUTHORIZED, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.UNAUTHORIZED]: {
                            summary: constants_1.CommonSummary.UNAUTHORIZED,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.UNAUTHORIZED,
                                    name: 'Unauthorized',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    FORBIDDEN: ({ 
    // WARNING!! This one is only used by our Schema validators, it must not be used directly
    description = 'Access not allowed, returns an object with an error object.', message = constants_1.APIResponseMessages.FORBIDDEN, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.FORBIDDEN]: {
                            summary: constants_1.CommonSummary.FORBIDDEN,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.FORBIDDEN,
                                    name: 'ForbiddenError',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    RECORD_NOT_FOUND: ({ description = 'No record found, returns an object with an error object.', message = constants_1.APIResponseMessages.RECORD_NOT_FOUND, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.RECORD_NOT_FOUND]: {
                            summary: constants_1.CommonSummary.RECORD_NOT_FOUND,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                                    name: 'NotFoundError',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    NOT_ACCEPTABLE: ({ description = 'Not Acceptable.', message = constants_1.APIResponseMessages.NOT_ACCEPTABLE, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.NOT_ACCEPTABLE]: {
                            summary: constants_1.CommonSummary.NOT_ACCEPTABLE,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.NOT_ACCEPTABLE,
                                    name: 'NotAcceptableError',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    UNPROCESSABLE: ({ 
    // WARNING!! This one is only used by our Schema validators, it must not be used directly
    description = 'Wrong data received.', message = constants_1.APIResponseMessages.UNPROCESSABLE, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: Object.assign(Object.assign({}, standardErrorResponseSchema), { properties: Object.assign(Object.assign({}, standardErrorResponseSchema.properties), { code: { type: 'string' }, details: { type: 'object' } }) }),
                    examples: {
                        [constants_1.ExampleField.UNPROCESSABLE]: {
                            summary: constants_1.CommonSummary.UNPROCESSABLE,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.UNPROCESSABLE,
                                    name: 'UnprocessableEntityError',
                                    message,
                                    code: 'VALIDATION_FAILED',
                                    details: [
                                        {
                                            path: '/0',
                                            code: 'required',
                                            message: "should have required property 'quantity'",
                                            info: {
                                                missingProperty: 'quantity',
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    RECORD_CONFLICT: ({ description = 'Record conflict, returns an object with an error object.', message = constants_1.APIResponseMessages.RECORD_CONFLICT, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.RECORD_CONFLICT]: {
                            summary: constants_1.CommonSummary.RECORD_CONFLICT,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                                    name: 'ConflictError',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
    INTERNAL_SERVER_ERROR: ({ description = 'Internal Server Error.', message = constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR, } = {}) => {
        return {
            description,
            content: {
                'application/json': {
                    schema: standardErrorResponseSchema,
                    examples: {
                        [constants_1.ExampleField.INTERNAL_SERVER_ERROR]: {
                            summary: constants_1.CommonSummary.INTERNAL_SERVER_ERROR,
                            value: {
                                error: {
                                    statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                                    name: 'InternalServerError',
                                    message,
                                },
                            },
                        },
                    },
                },
            },
        };
    },
};
//# sourceMappingURL=globals-specifications-responses-builder.js.map